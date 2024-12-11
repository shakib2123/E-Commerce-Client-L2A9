import {
  createCategoryIntoDB,
  deleteCategoryFromDB,
  getAllCategoriesFromDB,
  updateCategoryIntoDB,
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
      queryClient.invalidateQueries({ queryKey: ["ALL_CATEGORIES"] });
      toast.success("Category created successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["ALL_CATEGORIES"],
    queryFn: async () => await getAllCategoriesFromDB(),
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_CATEGORY"],
    mutationFn: async ({ id, categoryData }) =>
      await updateCategoryIntoDB(id, categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_CATEGORIES"] });
      toast.success("Category created successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_CATEGORY"],
    mutationFn: async (id) => await deleteCategoryFromDB(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_CATEGORIES"] });
      toast.success("Category deleted successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
