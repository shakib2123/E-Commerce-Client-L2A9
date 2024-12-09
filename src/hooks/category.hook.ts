import {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
} from "@/services/CategoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (categoryData) =>
      await createCategoryIntoDB(categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_CATEGORIES"] });
      toast.success("Category created successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["GET_ALL_CATEGORIES"],
    queryFn: async () => await getAllCategoriesFromDB(),
  });
};
