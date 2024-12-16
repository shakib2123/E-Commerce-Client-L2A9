import {
  createDuplicateProductIntoDB,
  createProductIntoDB,
  deleteProductFromDB,
  getAllProductsFromDB,
  getFlashSaleProductsFromDB,
  getMyProductsFromDB,
  getProductById,
  updateProductIntoDB,
} from "@/services/ProductService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: async (productData) => await createProductIntoDB(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_PRODUCTS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_FLASH_SALE_PRODUCTS"] });
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
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_PRODUCTS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_FLASH_SALE_PRODUCTS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_MY_PRODUCTS"] });
      toast.success("Product duplicated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllProducts = (query?: string) => {
  return useQuery({
    queryKey: ["GET_ALL_PRODUCTS"],
    queryFn: async () => await getAllProductsFromDB(query),
  });
};

export const useGetFlashSaleProducts = () => {
  return useQuery({
    queryKey: ["GET_FLASH_SALE_PRODUCTS"],
    queryFn: async () => await getFlashSaleProductsFromDB(),
  });
};

export const useGetMyProducts = () => {
  return useQuery({
    queryKey: ["GET_MY_PRODUCTS"],
    queryFn: async () => await getMyProductsFromDB(),
  });
};
export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["GET_PRODUCT_BY_ID"],
    queryFn: async () => await getProductById(id),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { id: string; payload: Record<string, unknown> }
  >({
    mutationKey: ["UPDATE_PRODUCT"],
    mutationFn: async ({ id, payload }) =>
      await updateProductIntoDB(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_PRODUCTS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_FLASH_SALE_PRODUCTS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_MY_PRODUCTS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCT_BY_ID"] });
      toast.success("Product updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_PRODUCT"],
    mutationFn: async (id) => await deleteProductFromDB(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_PRODUCTS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_FLASH_SALE_PRODUCTS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_MY_PRODUCTS"] });
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
