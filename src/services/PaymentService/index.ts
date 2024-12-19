"use server";

import axiosInstance from "@/lib/AxiosInstance";

export const createProceedToPaymentIntoDB = async (
  paymentData: Record<string, unknown>
) => {
  const { data } = await axiosInstance.post(
    "/payments/proceed-to-payment",
    paymentData
  );
  return data;
};
