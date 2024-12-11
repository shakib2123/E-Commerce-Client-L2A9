"use client";

import { useGetAllShops, useUpdateShop } from "@/hooks/shop.hook";
import { IShop } from "@/types";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "ownerEmail",
    label: "Owner Email",
  },
  {
    key: "isBlocked",
    label: "Is Blocked",
  },
  {
    key: "action",
    label: "Action",
  },
];

const ManageShops = () => {
  const [currentShopId, setCurrentShopId] = useState("");

  const { data: shops, isLoading, refetch } = useGetAllShops();

  const {
    mutate: updateShop,
    isPending: isUpdating,
    isSuccess: isUpdated,
  } = useUpdateShop();

  const handleShopBlock = (id: string, isBlocked: boolean) => {
    const shopData = {
      isBlocked: !isBlocked,
    };
    updateShop({ id, shopData });
  };

  useEffect(() => {
    if (isUpdated) {
      setCurrentShopId("");

      refetch();
    }
  }, [isUpdated, refetch]);

  return (
    <section className="max-w-screen-xl mx-auto">
      <h1 className="text-xl md:text-2xl font-medium mb-4">All Shops!</h1>
      <h1 className="text-lg font-medium">
        Total Shops: {shops?.data?.length || 0}
      </h1>
      {/* all shops */}
      <div className="mt-4">
        {isLoading ? (
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
            <TableBody>
              {shops?.data?.map((shop: IShop) => (
                <TableRow key={shop?.id}>
                  <TableCell className="min-w-[150px] lg:min-w-full">
                    {shop?.name || "Not added"}
                  </TableCell>
                  <TableCell className="min-w-[180px] lg:min-w-full">
                    {shop?.email}
                  </TableCell>
                  <TableCell>
                    {shop?.isBlocked ? (
                      <span className="text-red-500">Yes</span>
                    ) : (
                      <span className="text-green-500">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setCurrentShopId(shop.id);
                        handleShopBlock(shop.id, shop.isBlocked);
                      }}
                      color="warning"
                      size="sm"
                      className="min-w-[68px]"
                    >
                      {isUpdating &&
                      currentShopId === shop?.id &&
                      !isUpdated ? (
                        <Spinner color="white" size="sm" />
                      ) : shop?.isBlocked ? (
                        <span>Unblock</span>
                      ) : (
                        <span>Block</span>
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

export default ManageShops;
