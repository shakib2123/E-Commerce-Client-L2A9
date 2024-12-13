"use client";

import { useGetMyProducts } from "@/hooks/product.hook";
import { IProduct } from "@/types";
import {
  Avatar,
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const columns = [
  {
    key: "image",
    label: "Image",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "discountPrice",
    label: "Discount Price",
  },
  {
    key: "category",
    label: "Category",
  },

  {
    key: "isFlashSale",
    label: "Is Flash Sale",
  },
  {
    key: "flashSalePrice",
    label: "Flash Sale Price",
  },
  {
    key: "quantity",
    label: "Quantity",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const ProductManagement = () => {
  const { data: products, isLoading, isSuccess } = useGetMyProducts();

  console.log(products);

  return (
    <section className="max-w-screen-xl mx-auto">
      <h1 className="text-xl md:text-2xl font-medium">Product Management!</h1>
      <h1 className="text-lg font-medium">
        Total Product: {products?.data?.length || 0}
      </h1>

      <div className="mt-4">
        {isLoading && !isSuccess ? (
          <div className="flex items-center justify-center min-h-80">
            <Spinner size="lg" />
          </div>
        ) : (
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No data to display."}>
              {products?.data?.map((product: IProduct) => (
                <TableRow key={product?.id}>
                  <TableCell>
                    <Avatar isBordered radius="sm" src={product?.images[0]} />
                  </TableCell>
                  <TableCell className="min-w-[150px]">
                    {product?.name}
                  </TableCell>
                  <TableCell className="min-w-[250px]">
                    {product?.description}
                  </TableCell>
                  <TableCell className="min-w-20">$ {product?.price}</TableCell>
                  <TableCell className="min-w-20">
                    $ {product?.discountPrice}
                  </TableCell>
                  <TableCell className="min-w-[150px]">
                    {product?.category?.name}
                  </TableCell>

                  <TableCell className="">
                    {product?.isFlashSale ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="min-w-[80px]">
                    {product?.flashSalePrice
                      ? `$ ${product?.flashSalePrice}`
                      : "-"}
                  </TableCell>
                  <TableCell>{product?.inventoryCount}</TableCell>
                  <TableCell className="min-w-[350px] md:min-w-full flex gap-2">
                    <Button size="sm" color="primary">
                      Duplicate
                    </Button>
                    <Button size="sm" color="warning">
                      Edit
                    </Button>
                    <Button size="sm" color="danger">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
};

export default ProductManagement;
