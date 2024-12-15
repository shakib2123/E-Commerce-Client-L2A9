import {
  getAllShopsFromDB,
  getMyShopFromDB,
  updateShopImageIntoDB,
  updateShopIntoDB,
} from "@/services/ShopService";
import { IShop } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export const useGetAllShops = () => {
  return useQuery({
    queryKey: ["ALL_SHOPS"],
    queryFn: async () => await getAllShopsFromDB(),
  });
};

export const useGetMyShop = () => {
  return useQuery({
    queryKey: ["My_SHOP"],
    queryFn: async () => await getMyShopFromDB(),
  });
};

export const useUpdateShop = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { id: string; shopData: Partial<IShop> }>({
    mutationKey: ["UPDATE_SHOP"],
    mutationFn: async ({ id, shopData }) =>
      await updateShopIntoDB(id, shopData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_SHOPS"] });
      queryClient.invalidateQueries({ queryKey: ["My_SHOP"] });
      toast.success("Shop updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUpdateShopImage = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { id: string; formData: FormData }>({
    mutationKey: ["UPDATE_SHOP_IMAGE"],
    mutationFn: async ({ id, formData }) =>
      await updateShopImageIntoDB(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_SHOPS"] });
      queryClient.invalidateQueries({ queryKey: ["My_SHOP"] });
      toast.success("Shop image updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
