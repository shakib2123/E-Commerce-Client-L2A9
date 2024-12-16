import Link from "next/link";
import ProductCard from "../shared/ProductCard";
import { Button } from "@nextui-org/react";
import { IProduct } from "@/types";
import { useGetFlashSaleProducts } from "@/hooks/product.hook";

const FlashSaleProducts = () => {
  const { data: flashSaleProducts, isLoading: isProductLoading } =
    useGetFlashSaleProducts();
  console.log(flashSaleProducts);
  return (
    <div>
      {/* flash sale products */}
      <div className="py-8">
        <h2 className="text-xl md:text-2xl font-medium mb-1 text-orange-600">
          Flash sale products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {flashSaleProducts?.data?.slice(0, 8)?.map((product: IProduct) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        <div className="flex items-center justify-center my-4 ">
          <Link href={"/flash-sales"}>
            <Button color="primary">See All</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleProducts;
