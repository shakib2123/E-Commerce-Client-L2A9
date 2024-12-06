import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserRegistration = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),

    onSuccess: () => {
      toast.success("User login successful.");
    },
    onError: (error) => {
      if (error.message.includes("404")) {
        toast.error("User not found.");
      } else {
        toast.error(error.message);
      }
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FORGOT_PASSWORD"],
    mutationFn: async (userData) => await forgotPassword(userData),
    onSuccess: () => {
      toast.success("Email sent successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: async (userData) => await resetPassword(userData),
    onSuccess: () => {
      toast.success("Password reset successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
