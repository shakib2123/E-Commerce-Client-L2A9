"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IShop } from "@/types";

export const getAllShopsFromDB = async () => {
  const res = await axiosInstance.get("/shops");
  return res.data;
};
export const getMyShopFromDB = async () => {
  const res = await axiosInstance.get(`/shops/my-shop`);
  return res.data;
};

export const updateShopImageIntoDB = async (id: string, formData: FormData) => {
  const res = await axiosInstance.patch(
    `/shops/update-shop-image/${id}`,
    formData
  );
  return res.data;
};

export const updateShopIntoDB = async (
  id: string,
  shopData: Partial<IShop>
) => {
  const res = await axiosInstance.patch(`/shops/${id}`, shopData);
  return res.data;
};
