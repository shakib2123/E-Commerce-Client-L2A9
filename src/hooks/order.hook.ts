import { getShopOrdersFromDB } from "@/services/OrderService";
import { useQuery } from "@tanstack/react-query";

export const useGetShopOrders = (shopId: string) => {
  return useQuery({
    queryKey: ["GET_SHOP_ORDERS"],
    queryFn: async () => await getShopOrdersFromDB(shopId),
  });
};
