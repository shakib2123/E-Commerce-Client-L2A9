import { IProduct } from "@/types";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div
      key={product.id}
      className="border rounded-lg shadow-sm p-2 flex flex-col"
    >
      <div className="flex-grow">
        <Image
          src={product.images[0]}
          alt="product"
          height={200}
          width={200}
          className="rounded-t-lg min-w-full object-fill h-44 md:h-64"
        />
      </div>
      <div>
        <Link
          href={`/all-products/${product.id}`}
          className="md:text-lg font-medium hover:text-primary-600 cursor-pointer"
        >
          {product.name}
        </Link>
        <p className="text-gray-800 flex mt-1">
          $<span className="text-3xl">{product.price}</span>
        </p>
        <p className="text-gray-600 text-xs md:text-sm">
          Category: {product.category?.name}
        </p>
        <Link href={`/all-products/${product.id}`}>
          <Button color="primary" className="w-full mt-3">
            Quick View
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
