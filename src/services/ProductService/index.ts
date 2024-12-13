"use server";

import axiosInstance from "@/lib/AxiosInstance";

export const createProductIntoDB = async (formData: FormData) => {
  const { data } = await axiosInstance.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
export const getMyProductsFromDB = async () => {
  const { data } = await axiosInstance.get("/products/my-products");
  return data;
};