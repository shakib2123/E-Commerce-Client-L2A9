import {
  getAllUsersFromDB,
  getCurrentUserFromDB,
  updateUserIntoDB,
} from "@/services/UserService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["ALL_USERS"],
    queryFn: async () => await getAllUsersFromDB(),
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["CURRENT_USER"],
    queryFn: async () => await getCurrentUserFromDB(),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async ({ id, userData }) =>
      await updateUserIntoDB(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["CURRENT_USER"],
      });
      queryClient.invalidateQueries({
        queryKey: ["ALL_USERS"],
      });
      toast.success("User updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
