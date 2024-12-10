import {
  getAllUsersFromDB,
  getCurrentUserFromDB,
} from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";

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
