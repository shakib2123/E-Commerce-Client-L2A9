import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["CURRENT_USER"],
    //   queryFn: async () => await getCurrentUserFromDB(),
  });
};
