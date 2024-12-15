"use client";

import { useGetMyShop, useUpdateShopImage } from "@/hooks/shop.hook";
import { Avatar, Spinner, Tooltip } from "@nextui-org/react";
import { FaCamera, FaPen } from "react-icons/fa";

const Shop = () => {
  const { data: shop, isLoading: isShopLoading } = useGetMyShop();
  console.log(shop);

  const { mutate: updateShopImage, isPending: isShopImageUpdating } =
    useUpdateShopImage();

  const handleChangeShopPhoto = async (
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
        <div className="bg-orange-100 p-4 rounded-lg">
          <div className="flex gap-4">
            <div className="relative">
              <Avatar
                radius="sm"
                className="w-20 md:w-40 h-20 md:h-40 text-large"
                src={shop?.data?.logo}
              />
              <div className="flex items-center justify-center w-fit bg-gray-100 p-2 rounded-full absolute bottom-0 right-0 md:bottom-2 md:right-2">
                <label
                  htmlFor="shopPhoto"
                  className="flex flex-col items-center justify-center hover:cursor-pointer"
                >
                  {isShopImageUpdating ? (
                    <Spinner size="sm" />
                  ) : (
                    <FaCamera className="text-[16px]" />
                  )}
                  <input
                    onChange={handleChangeShopPhoto}
                    id="shopPhoto"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <h3 className="font-semibold text-xl">
                  {shop?.data?.name || "Shop Name"}
                </h3>
                <Tooltip content="Edit Shop Info">
                  <button className="p-2 rounded-lg hover:bg-gray-50 w-fit cursor-pointer">
                    <FaPen className="text-[16px]" />
                  </button>
                </Tooltip>
              </div>

              <p>{shop?.data?.description || "Shop Description"}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Shop;
