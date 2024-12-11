"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { IUser } from "@/types";

export const getAllUsersFromDB = async () => {
  const res = await axiosInstance.get(`/users`);
  return res.data;
};

export const getCurrentUserFromDB = async () => {
  const res = await axiosInstance.get(`/users/user-data`);
  return res.data;
};
export const updateUserIntoDB = async (
  id: string,
  userData: Partial<IUser>
) => {
  const res = await axiosInstance.patch(`/users/${id}`, userData);
  return res.data;
};
