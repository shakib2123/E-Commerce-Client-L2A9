"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);
    console.log({ data });

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
    };
  }

  return decodedToken;
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const forgotPassword = async (userData: FieldValues) => {
  try {
    const res = await axiosInstance.post("/auth/forgot-password", userData);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const resetPassword = async (userData: FieldValues) => {
  try {
    const res = await axiosInstance.post("/auth/reset-password", userData);
    return res.data;
  } catch {
    throw new Error("Failed to reset password");
  }
};
