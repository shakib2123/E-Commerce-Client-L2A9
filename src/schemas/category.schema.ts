import { z } from "zod";

const categoryValidationSchema = z.object({
  categoryName: z
    .string({
      required_error: "Please enter category name!",
    })
    .min(1, "Please enter category name!")
    .max(100, "Category name must be less than 100 characters!"),

  categoryDescription: z
    .string()
    .max(1000, "Category description must be less than 1000 characters!")
    .optional(),
});

export default categoryValidationSchema;
