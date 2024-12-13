import {
  createDuplicateProductIntoDB,
  createProductIntoDB,
  deleteProductFromDB,
  getMyProductsFromDB,
} from "@/services/ProductService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: async (productData) => await createProductIntoDB(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_MY_PRODUCTS"] });
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCreateDuplicateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, Record<string, unknown>>({
    mutationKey: ["CREATE_DUPLICATE_PRODUCT"],
    mutationFn: async (productData) =>
      await createDuplicateProductIntoDB(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_MY_PRODUCTS"] });
      toast.success("Product duplicated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetMyProducts = () => {
  return useQuery({
    queryKey: ["GET_MY_PRODUCTS"],
    queryFn: async () => await getMyProductsFromDB(),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_PRODUCT"],
    mutationFn: async (id) => await deleteProductFromDB(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_MY_PRODUCTS"] });
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
