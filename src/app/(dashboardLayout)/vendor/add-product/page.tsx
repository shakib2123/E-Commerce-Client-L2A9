"use client";

import CMForm from "@/components/form/CMForm";
import CMInput from "@/components/form/CMInput";
import CMSelect from "@/components/form/CMSelect";
import { useGetAllCategories } from "@/hooks/category.hook";
import createProductValidationSchema from "@/schemas/product.schema";
import { ICategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { IoWarningOutline } from "react-icons/io5";
import { useCreateProduct } from "@/hooks/product.hook";
import { useRouter } from "next/navigation";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

const AddProduct = () => {
  const [imageFiles, setImageFiles] = useState<File[] | null>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const router = useRouter();

  const {
    mutate: createProduct,
    isPending: isProductCreating,
    isSuccess: isProductCreated,
  } = useCreateProduct();

  const { data: categories, isLoading: isCategoryLoading } =
    useGetAllCategories();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!!imageFiles && imageFiles.length <= 0) {
      return;
    }

    const formData = new FormData();

    // Add JSON data to FormData
    const productData = {
      name: data.productName,
      description: data.productDescription,
      price: data.productPrice,
      discountPrice: data.discountPrice,
      categoryId: data.productCategory,
      inventoryCount: data.inventoryCount,
    };

    formData.append("data", JSON.stringify(productData));

    for (const image of imageFiles!) {
      formData.append("productImages", image);
    }

    createProduct(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (imageFiles!.length >= 4) {
      return toast.message("You can only upload a maximum of 4 images");
    }

    setImageFiles((prev) => [...(prev ?? []), file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const categoryData = categories?.data?.map((category: ICategory) => ({
    key: category?.id,
    label: category?.name,
  }));

  useEffect(() => {
    if (isProductCreated) {
      setImageFiles([]);
      setImagePreviews([]);
      router.push("/vendor/products");
    }
  }, [isProductCreated, router]);

  return (
    <section className="max-w-screen-xl mx-auto">
      <h1 className="text-xl md:text-2xl font-medium">
        Add Product For Your Shop!
      </h1>

      {/* Add Product Form */}
      <div className="my-4">
        <CMForm
          resolver={zodResolver(createProductValidationSchema)}
          onSubmit={handleSubmit}
          isReset={isProductCreated === true}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CMInput label="Product Name" name="productName" />
            <CMInput label="Description" name="productDescription" />
            <CMSelect
              itemData={categoryData}
              label="Category"
              name="productCategory"
              isDisabled={isCategoryLoading}
            />
            <CMInput label="Price" name="productPrice" type="number" />
            <CMInput
              label="Discount Price"
              name="discountPrice"
              type="number"
            />
            <CMInput
              label="Inventory Count"
              name="inventoryCount"
              type="number"
            />
          </div>

          {/* image */}
          <div className="mt-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="productImages"
                className="flex flex-col items-center justify-center w-full h-32 md:h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                </div>
                <input
                  onChange={(e) => handleImageChange(e)}
                  multiple
                  id="productImages"
                  type="file"
                  className="hidden"
                  name="productImages"
                />
              </label>
            </div>

            {!!imageFiles && imageFiles.length <= 0 ? (
              <p className="text-red-500 mt-2 flex gap-1">
                <IoWarningOutline className="text-lg" /> Uploading image for
                product is required!
              </p>
            ) : (
              ""
            )}

            {imagePreviews?.length > 0 && (
              <div className="flex gap-4 md:gap-3 flex-wrap mt-4">
                {imagePreviews?.map((imageDataUrl) => (
                  <div
                    key={imageDataUrl}
                    className="relative overflow-hidden size-[75px] md:size-40 rounded-xl border-2 border-dashed border-default-300 p-0.5 md:p-1"
                  >
                    <Image
                      height={400}
                      width={400}
                      alt="item"
                      className="h-full w-full object-cover object-center rounded-md"
                      src={imageDataUrl}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button type="submit" className="mt-4 w-full" color="primary">
            {isProductCreating ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Add Product"
            )}
          </Button>
        </CMForm>
      </div>
    </section>
  );
};

export default AddProduct;
