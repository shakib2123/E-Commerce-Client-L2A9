"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const getAllUsersFromDB = async () => {
  const res = await axiosInstance.get(`/users`);
  return res.data;
};

export const getCurrentUserFromDB = async () => {
  const res = await axiosInstance.get(`/users/user-data`);
  return res.data;
};
