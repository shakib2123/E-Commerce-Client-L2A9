import { createCategoryIntoDB } from "@/services/CategoryService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateCategory = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (categoryData) =>
      await createCategoryIntoDB(categoryData),
    onSuccess: () => {
      toast.success("Category created successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
