import { z } from "zod";

const createProductValidationSchema = z.object({
  productName: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Provide a product name."),
  productDescription: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Provide a product description."),
  productCategory: z
    .string({
      required_error: "Category is required",
    })
    .min(1, "Provide a product category."),
  productPrice: z
    .string({
      required_error: "Price is required",
    })
    .min(1, "Provide a product price."),
  discountPrice: z
    .string({
      required_error: "Discount price is required",
    })
    .min(1, "Provide a product discount price."),
  inventoryCount: z
    .string({
      required_error: "Inventory count is required",
    })
    .min(1, "Provide a product inventory count."),
});

export default createProductValidationSchema;
