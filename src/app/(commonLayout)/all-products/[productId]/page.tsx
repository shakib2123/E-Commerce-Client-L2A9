"use client";

import ImageGallery from "@/components/shared/ImageGallery";
import ProductCard from "@/components/shared/ProductCard";
import { useGetAllProducts, useGetProductById } from "@/hooks/product.hook";
import { addToCart } from "@/services/CartService";
import { IOrder, IProduct, IReview } from "@/types";
import { Button, Spinner, User } from "@nextui-org/react";
import Link from "next/link";
import { useEffect } from "react";

import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { useGetCurrentUser } from "@/hooks/user.hook";

interface IProps {
  params: {
    productId: string;
  };
}

const ProductDetails = ({ params: { productId } }: IProps) => {
  // const [rating, setRating] = useState(0);
  const { data: product } = useGetProductById(productId);

  const handleAddToCart = (product: IProduct) => {
    addToCart(product);
  };

  const query = `?categoryId=${product?.data?.categoryId}`;

  const {
    data: products,
    isLoading: isProductsLoading,
    refetch,
  } = useGetAllProducts(query);

  const { data: userInfo } = useGetCurrentUser();

  useEffect(() => {
    if (product?.success) {
      refetch();
    }
  }, [refetch, query, product, productId]);

  const isAbleToAddReview = !product?.data?.orderItem?.find(
    (order: IOrder) => order?.userId === userInfo?.data?.id
  );

  return (
    <section className="max-w-screen-xl mx-auto px-3 py-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="rounded-lg overflow-hidden w-full">
          <ImageGallery images={product?.data?.images} />
        </div>
        <div className="flex flex-col justify-between w-full gap-2 my-4">
          <div>
            <Link
              href={`/shop/${product?.data?.shop?.id}`}
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

      {/* related products */}
      <div className="py-12">
        <h2 className="text-xl md:text-2xl font-medium mb-1">
          Related products
        </h2>
        {isProductsLoading ? (
          <div className="flex items-center justify-center min-h-80">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {products?.data?.map((product: IProduct) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        )}
      </div>

      {/* review and ratings */}
      <div>
        <h2 className="text-xl md:text-2xl font-medium mb-1">Review</h2>
        <div className="bg-primary-50 rounded-lg">
          {product?.data?.reviews?.length > 0 ? (
            product?.data?.reviews?.map((review: IReview) => (
              <div key={review?.id} className="border p-2 rounded-lg">
                <div>
                  <User
                    name={review?.user?.name}
                    avatarProps={{
                      src: review?.user?.profilePhoto,
                    }}
                  />
                </div>
                <div className="mt-2">
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={review?.rating || 0}
                  />
                  <p className="mt-1">{review?.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center text-gray-700 min-h-24">
              <p>No review or comment found!</p>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-2">
          <Button
            onClick={() => {}}
            isDisabled={!isAbleToAddReview}
            color="primary"
            className=""
          >
            Add review
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
