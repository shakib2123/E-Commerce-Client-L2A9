"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const getCurrentUserFromDB = async () => {
  const res = await axiosInstance.get(`/users/user-data`);
  return res.data;
};
