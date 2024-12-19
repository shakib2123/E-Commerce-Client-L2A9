"use server";

import axiosInstance from "@/lib/AxiosInstance";

export const getShopOrdersFromDB = async (shopId: string) => {
  const res = await axiosInstance.get(`/orders/${shopId}`);
  return res.data;
};
