"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const createCategoryIntoDB = async (
  categoryData: Record<string, string>
) => {
  const res = await axiosInstance.post(`/categories`, categoryData);
  return res.data;
};

export const getAllCategoriesFromDB = async () => {
  const res = await axiosInstance.get(`/categories`);
  return res.data;
};

export const updateCategoryIntoDB = async (
  id: string,
  categoryData: Record<string, string>
) => {
  const res = await axiosInstance.patch(`/categories/${id}`, categoryData);
  return res.data;
};
