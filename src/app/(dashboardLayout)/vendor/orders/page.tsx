"use client";

import { useGetShopOrders } from "@/hooks/order.hook";
import { useGetCurrentUser } from "@/hooks/user.hook";
import { useEffect } from "react";

const Orders = () => {
  const {
    data: userData,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
  } = useGetCurrentUser();

  const {
    data: orders,
    isLoading,
    refetch,
    isSuccess,
  } = useGetShopOrders(userData?.data?.shop?.id);

  useEffect(() => {
    if (isUserSuccess) {
      refetch();
    }
  }, [isUserSuccess, refetch]);

  console.log(orders);

  return (
    <div>
      <h1>This is Orders component</h1>
    </div>
  );
};

export default Orders;
