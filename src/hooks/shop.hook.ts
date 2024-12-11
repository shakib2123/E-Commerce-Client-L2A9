import { getAllShopsFromDB, updateShopIntoDB } from "@/services/ShopService";
import { IShop } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export const useGetAllShops = () => {
  return useQuery({
    queryKey: ["ALL_SHOPS"],
    queryFn: async () => await getAllShopsFromDB(),
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
      toast.success("Shop updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
