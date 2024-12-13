import {
  createProductIntoDB,
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

export const useGetMyProducts = () => {
  return useQuery({
    queryKey: ["GET_MY_PRODUCTS"],
    queryFn: async () => await getMyProductsFromDB(),
  });
};
