"use client";

import UpdateShopInfoModal from "@/components/modals/UpdateShopInfoModal";
import {
  useGetMyShop,
  useUpdateShopBannerImage,
  useUpdateShopImage,
} from "@/hooks/shop.hook";
import { Avatar, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import bannerImage from "@/assets/banner-image.jpeg";
import { useEffect } from "react";
import { useGetCurrentUser } from "@/hooks/user.hook";
import { useGetMyProducts } from "@/hooks/product.hook";
import ProductCard from "@/components/shared/ProductCard";
import { IProduct } from "@/types";
const Shop = () => {
  const { data: user, isSuccess: isUserSuccess } = useGetCurrentUser();

  const {
    data: shop,
    isLoading: isShopLoading,
    isSuccess: isShopSuccess,
    refetch,
  } = useGetMyShop(user?.data?.email || "");

  useEffect(() => {
    refetch();
  }, [isUserSuccess, user?.data?.email, isShopSuccess, refetch]);

  const { mutate: updateShopImage, isPending: isShopImageUpdating } =
    useUpdateShopImage();
  const {
    mutate: updateShopBannerImage,
    isPending: isShopBannerImageUpdating,
  } = useUpdateShopBannerImage();

  const { data: myProducts } = useGetMyProducts();

  const handleChangeShopBanner = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData();
    formData.append("bannerImage", e.target.files![0]);
    updateShopBannerImage({ id: shop?.data?.id, formData });
  };

  const handleChangeShopLogo = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData();
    formData.append("shopImage", e.target.files![0]);

    updateShopImage({ id: shop?.data?.id, formData });
  };

  return (
    <section className="max-w-screen-xl mx-auto">
      {isShopLoading ? (
        <div className="flex items-center justify-center min-h-80">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="">
          <div className="border-b pb-3">
            <div className="mb-4 w-full h-[200px] md:h-[250px] lg:h-[300px] overflow-hidden relative">
              <Image
                src={shop?.data?.bannerImage || bannerImage}
                alt="shop banner"
                width={1000}
                height={300}
                className="w-full h-full object-cover object-center"
              />
              <div className="flex items-center justify-center w-fit bg-gray-100 p-2 rounded-full absolute bottom-0 right-0 md:bottom-2 md:right-2">
                <label
                  htmlFor="shopBanner"
                  className="flex flex-col items-center justify-center hover:cursor-pointer"
                >
                  {isShopBannerImageUpdating ? (
                    <Spinner size="sm" />
                  ) : (
                    <FaCamera className="text-[16px]" />
                  )}
                  <input
                    onChange={handleChangeShopBanner}
                    id="shopBanner"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3">
              <div className="relative">
                <Avatar
                  radius="lg"
                  className="h-24 w-24 text-large"
                  src={shop?.data?.logo}
                />
                <div className="flex items-center justify-center w-fit bg-gray-100 p-1 rounded-full absolute bottom-0 right-0 md:bottom-2 md:right-2">
                  <label
                    htmlFor="shopLogo"
                    className="flex flex-col items-center justify-center hover:cursor-pointer"
                  >
                    {isShopImageUpdating ? (
                      <Spinner size="sm" />
                    ) : (
                      <FaCamera className="text-[16px]" />
                    )}
                    <input
                      onChange={handleChangeShopLogo}
                      id="shopLogo"
                      type="file"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium">
                    {shop?.data?.name || "Shop name not added"}
                  </h2>
                  <UpdateShopInfoModal shop={shop?.data} />
                </div>
                <p className="text-sm">
                  {shop?.data?.followedShop?.length} followers
                </p>

                <p className="text-sm">{shop?.data?.email}</p>
              </div>
            </div>
          </div>

          <div className="py-8">
            <h1 className="text-xl font-medium mb-2">My Products</h1>
            {myProducts?.data?.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                {myProducts?.data?.map((product: IProduct) => (
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
        </div>
      )}
    </section>
  );
};

export default Shop;
