"use client";

import ProductCard from "@/components/shared/ProductCard";
import { useGetFlashSaleProducts } from "@/hooks/product.hook";
import { IProduct } from "@/types";
import { Spinner } from "@nextui-org/react";

const FlashSales = () => {
  const { data: flashSaleProducts, isLoading: isProductLoading } =
    useGetFlashSaleProducts();

  return (
    <section className="max-w-screen-xl mx-auto px-3 py-4">
      <h2 className="text-xl md:text-2xl font-medium mb-3 text-gray-700">
        Flash sale products
      </h2>
      {isProductLoading ? (
        <div className="flex items-center justify-center min-h-80">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {flashSaleProducts?.data?.map((product: IProduct) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FlashSales;
