"use client";
import { useGetShopById } from "@/hooks/shop.hook";
import { Avatar, Button, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useEffect } from "react";
import bannerImage from "@/assets/banner-image.jpeg";
import { IProduct } from "@/types";
import ProductCard from "@/components/shared/ProductCard";
import { useGetShopProducts } from "@/hooks/product.hook";

interface IProps {
  params: {
    shopId: string;
  };
}

const VendorShop = ({ params: { shopId } }: IProps) => {
  const { data: shop, refetch } = useGetShopById(shopId);

  const {
    data: products,
    isLoading: isProductLoading,
    refetch: productRefetch,
  } = useGetShopProducts(shopId);

  useEffect(() => {
    refetch();
  }, [refetch, shopId]);

  useEffect(() => {
    productRefetch();
  }, [productRefetch, shopId]);

  return (
    <section className="max-w-screen-xl mx-auto pb-2">
      <div className="border-b pb-3">
        <div className="mb-4 w-full h-[200px] md:h-[250px] lg:h-[300px] overflow-hidden">
          <Image
            src={shop?.data?.bannerImage || bannerImage}
            alt="shop banner"
            width={1000}
            height={300}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex items-center gap-3 px-3">
          <Avatar
            radius="lg"
            className="h-24 w-24 text-large"
            src={shop?.data?.logo}
          />
          <div>
            <h2 className="font-medium">
              {shop?.data?.name || "Shop name not added"}
            </h2>
            <p className="text-sm">
              {shop?.data?.followedShop.length || 0} followers
            </p>
            <Button className="mt-2 w-[90px]" size="sm">
              Follow
            </Button>
          </div>
        </div>
      </div>

      <div className="py-8">
        <h1 className="text-xl font-medium mb-2">Shop Products</h1>
        {isProductLoading ? (
          <div className="flex items-center justify-center min-h-80">
            <Spinner size="lg" />
          </div>
        ) : products?.data?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {products?.data?.map((product: IProduct) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-80">
            <h2 className="text-xl md:text-2xl font-medium mb-1 text-gray-600">
              No products found
            </h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default VendorShop;
