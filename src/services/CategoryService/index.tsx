"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const createCategoryIntoDB = async (
  categoryData: Record<string, string>
) => {
  const res = await axiosInstance.post(`/categories`, categoryData);
  return res.data;
};
