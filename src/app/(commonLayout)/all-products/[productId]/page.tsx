"use client";

import ImageGallery from "@/components/shared/ImageGallery";
import { useGetProductById } from "@/hooks/product.hook";
import { addToCart } from "@/services/CartService";
import { IProduct } from "@/types";
import { Button } from "@nextui-org/react";
import { User } from "@nextui-org/user";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  params: {
    productId: string;
  };
}

const ProductDetails = ({ params: { productId } }: IProps) => {
  const { data: product, isLoading: isProductLoading } =
    useGetProductById(productId);

  console.log(product);

  const handleAddToCart = (product: IProduct) => {
    addToCart(product);
  };

  return (
    <section className="max-w-screen-xl mx-auto px-3 py-4">
      <div className="flex gap-4">
        <div className="rounded-lg overflow-hidden w-full">
          <ImageGallery images={product?.data?.images} />
        </div>
        <div className="flex flex-col justify-between w-full gap-2 my-4">
          <div>
            <Link
              href={`/shops/${product?.data?.shop?.id}`}
              className=" rounded-lg text-primary hover:text-orange-600 w-fit hover:underline "
            >
              Visit the {product?.data?.shop?.name || "Unknown"} store
            </Link>
            <div className="border-b border-gray-300 pb-2">
              <h1 className="text-xl md:text-3xl font-medium mb-1 text-gray-500">
                {product?.data?.name}
              </h1>
              <p>
                <span className="font-medium">Category:</span>{" "}
                {product?.data?.category?.name}
              </p>
              <p className="mt-1">
                <span className="font-medium">Total rating:</span>{" "}
                {product?.data?.ratingsCount || 0}
              </p>
            </div>

            <div className="mt-3">
              <h1 className="font-medium mb-1 flex">
                $
                <span className="text2xl md:text-2xl">
                  {product?.data?.price}
                </span>
              </h1>

              <div>
                <p className="text-xl font-bold ">Description:</p>
                <p>{product?.data?.description}</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              handleAddToCart(product?.data);
            }}
            color="primary"
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
