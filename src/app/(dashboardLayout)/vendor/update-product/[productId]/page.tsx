"use client";
import CMForm from "@/components/form/CMForm";
import CMInput from "@/components/form/CMInput";
import CMSelect from "@/components/form/CMSelect";
import { useGetAllCategories } from "@/hooks/category.hook";
import { useGetProductById, useUpdateProduct } from "@/hooks/product.hook";
import { ICategory } from "@/types";
import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IoWarningOutline } from "react-icons/io5";

interface IProps {
  params: {
    productId: string;
  };
}

const UpdateProduct = ({ params: { productId } }: IProps) => {
  const router = useRouter();

  const { data: product, isLoading: isProductLoading } =
    useGetProductById(productId);

  const { data: categories, isLoading: isCategoryLoading } =
    useGetAllCategories();

  const {
    mutate: updateProduct,
    isPending: isProductUpdating,
    isSuccess: isProductUpdated,
  } = useUpdateProduct();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const productData = {
      name: data.productName,
      description: data.productDescription,
      price: Number(data.productPrice),
      discountPrice: Number(data.discountPrice),
      categoryId: data.productCategory,
      shopId: product?.data?.shopId,
      userId: product?.data?.userId,
      inventoryCount: Number(data.inventoryCount),
      images: product?.data?.images,
    };

    updateProduct({ id: productId, payload: productData });
  };

  const categoryData = categories?.data?.map((category: ICategory) => ({
    key: category?.id,
    label: category?.name,
  }));

  useEffect(() => {
    if (isProductUpdated) {
      router.push("/vendor/products");
    }
  }, [isProductUpdated, router]);

  return (
    <section className="max-w-screen-xl mx-auto">
      <h1 className="text-xl md:text-2xl font-medium">Update Product!</h1>

      {isProductLoading && isCategoryLoading ? (
        <div className="flex items-center justify-center min-h-80">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="my-4">
          <CMForm
            onSubmit={handleSubmit}
            defaultValues={{
              productName: product?.data?.name,
              productDescription: product?.data?.description,
              productCategory: product?.data?.categoryId,
              productPrice: product?.data?.price,
              discountPrice: product?.data?.discountPrice,
              inventoryCount: product?.data?.inventoryCount,
            }}
            isReset={isProductUpdated}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CMInput label="Product Name" name="productName" />
              <CMInput label="Description" name="productDescription" />
              <CMSelect
                itemData={categoryData}
                defaultValue={product?.data?.categoryId}
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

            <div className="mt-4">
              <p className="text-red-500 mt-2 flex gap-1">
                <IoWarningOutline className="text-lg" /> You cannot able to
                update images.
              </p>

              {!isProductLoading && (
                <div className="flex gap-4 md:gap-3 flex-wrap mt-4">
                  {product?.data?.images?.map((imageDataUrl: string) => (
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
              {isProductUpdating ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update"
              )}
            </Button>
          </CMForm>
        </div>
      )}
    </section>
  );
};

export default UpdateProduct;
