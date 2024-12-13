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

export const getMyProductsFromDB = async () => {
  const { data } = await axiosInstance.get("/products/my-products");
  return data;
};
export const deleteProductFromDB = async (id: string) => {
  const { data } = await axiosInstance.delete(`/products/${id}`);
  return data;
};
