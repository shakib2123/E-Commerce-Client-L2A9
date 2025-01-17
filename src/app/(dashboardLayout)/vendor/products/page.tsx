"use client";

import FlashSaleModal from "@/components/modals/FlashSaleModal";
import {
  useCreateDuplicateProduct,
  useDeleteProduct,
  useGetMyProducts,
  useUpdateProduct,
} from "@/hooks/product.hook";
import { IProduct } from "@/types";
import {
  Avatar,
  Button,
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

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
  const [productIdToDuplicate, setProductIdToDuplicate] = useState("");
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const [productIdToUpdate, setProductIdToUpdate] = useState("");
  const [productIdToRemoveFlashSale, setProductIdToRemoveFlashSale] =
    useState("");
  const [status, setStatus] = useState("");

  const [quantityValue, setQuantityValue] = useState(0);

  const router = useRouter();

  const { data: products, isLoading, isSuccess, refetch } = useGetMyProducts();

  const {
    mutate: updateProductFlashSale,
    isPending: isProductRemovingFromFlashSale,
  } = useUpdateProduct();

  const {
    mutate: createDuplicateProduct,
    isPending: isDuplicateProductLoading,
    isSuccess: isDuplicateProductSuccess,
  } = useCreateDuplicateProduct();

  const {
    mutate: deleteProduct,
    isPending: isDeleteProductLoading,
    isSuccess: isDeleteProductSuccess,
  } = useDeleteProduct();

  const { mutate: updateProduct } = useUpdateProduct();

  const handleRemoveFlashSaleProduct = (product: IProduct) => {
    setStatus("RemoveFlashSale");
    setProductIdToRemoveFlashSale(product?.id);
    const productData = {
      isFlashSale: false,
      flashSalePrice: 0,
    };

    updateProductFlashSale({ id: product?.id, payload: productData });
  };

  const handleDuplicateProduct = (product: IProduct) => {
    setStatus("Duplicating");
    setProductIdToDuplicate(product?.id);
    const productData = {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      discountPrice: product?.discountPrice,
      categoryId: product?.categoryId,
      shopId: product?.shopId,
      userId: product?.userId,
      inventoryCount: product?.inventoryCount,
      images: product?.images,
    };

    createDuplicateProduct(productData);
  };

  const handleDeleteProduct = (id: string) => {
    setStatus("Deleting");
    setProductIdToDelete(id);
    deleteProduct(id);
  };

  useEffect(() => {
    const handleUpdateQuantity = () => {
      if (productIdToUpdate && quantityValue !== null && quantityValue >= 0) {
        updateProduct({
          id: productIdToUpdate,
          payload: { inventoryCount: quantityValue },
        });
      }
    };
    handleUpdateQuantity();
  }, [quantityValue, updateProduct, productIdToUpdate]);

  useEffect(() => {
    if (isDuplicateProductSuccess) {
      refetch();
      setProductIdToDuplicate("");
      setStatus("");
    }
    if (isDeleteProductSuccess) {
      refetch();
      setProductIdToDelete("");
      setStatus("");
    }
  }, [isDuplicateProductSuccess, isDeleteProductSuccess, refetch]);

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

                  <TableCell className="min-w-[150px]">
                    <Input
                      onBlur={(e) => {
                        setQuantityValue(
                          Number((e.target as HTMLInputElement).value)
                        );
                        setProductIdToUpdate(product?.id);
                      }}
                      variant="bordered"
                      type="number"
                      name="quantity"
                      placeholder="Quantity"
                      defaultValue={product?.inventoryCount.toString()}
                      className="min-w-24 w-full"
                    />
                  </TableCell>

                  <TableCell className="min-w-full flex gap-2">
                    {product?.isFlashSale ? (
                      <Button
                        onClick={() => handleRemoveFlashSaleProduct(product)}
                        size="sm"
                        color="primary"
                        className="min-w-[75px]"
                      >
                        {isProductRemovingFromFlashSale &&
                        productIdToRemoveFlashSale === product?.id &&
                        status === "RemoveFlashSale" ? (
                          <Spinner color="white" size="sm" />
                        ) : (
                          "Remove Flash Sale"
                        )}
                      </Button>
                    ) : (
                      <FlashSaleModal productId={product?.id} />
                    )}
                    <Button
                      onClick={() => handleDuplicateProduct(product)}
                      size="sm"
                      color="primary"
                      className="min-w-[75px]"
                    >
                      {isDuplicateProductLoading &&
                      productIdToDuplicate === product?.id &&
                      status === "Duplicating" ? (
                        <Spinner color="white" size="sm" />
                      ) : (
                        "Duplicate"
                      )}
                    </Button>
                    <Button
                      onClick={() =>
                        router.push(`/vendor/update-product/${product?.id}`)
                      }
                      size="sm"
                      color="warning"
                    >
                      Edit
                    </Button>
                    <Button
                      className="min-w-[65px]"
                      onClick={() => handleDeleteProduct(product?.id)}
                      size="sm"
                      color="danger"
                    >
                      {isDeleteProductLoading &&
                      productIdToDelete === product?.id &&
                      status === "Deleting" ? (
                        <Spinner color="white" size="sm" />
                      ) : (
                        "Delete"
                      )}
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
