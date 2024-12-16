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

export const createDuplicateProductIntoDB = async (
  productData: Record<string, unknown>
) => {
  const { data } = await axiosInstance.post(
    "/products/create-duplicate-product",
    productData
  );
  return data;
};

export const getAllProductsFromDB = async (query?: string) => {
  console.log(`/products${query}`);
  const { data } = await axiosInstance.get(`/products${query}`);
  return data;
};
export const getFlashSaleProductsFromDB = async () => {
  const { data } = await axiosInstance.get(`/products/flash-sales`);
  return data;
};

export const getMyProductsFromDB = async () => {
  const { data } = await axiosInstance.get("/products/my-products");
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};
export const updateProductIntoDB = async (
  id: string,
  payload: Record<string, unknown>
) => {
  const { data } = await axiosInstance.patch(`/products/${id}`, payload);
  return data;
};

export const deleteProductFromDB = async (id: string) => {
  const { data } = await axiosInstance.delete(`/products/${id}`);
  return data;
};
