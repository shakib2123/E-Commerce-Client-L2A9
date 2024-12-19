"use client";

import CMForm from "@/components/form/CMForm";
import CMInput from "@/components/form/CMInput";
import { useUser } from "@/context/user.provider";
import { getCart, ICartItem } from "@/services/CartService";
import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { useCreateProceedToPayment } from "@/hooks/payment.hook";

const Checkout = () => {
  const { user } = useUser();
  const cart = getCart();

  const totalPrice = cart[0]?.items.reduce(
    (total: number, item: ICartItem) => total + item.price,
    0
  );

  const {
    mutate: createProceedToPayment,
    data: stripeData,
    isSuccess,
    isPending,
  } = useCreateProceedToPayment();

  console.log(stripeData);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const handleCreateOrder = () => {
    const orderData = {
      userId: user?.id || "",
      shopId: cart[0]?.shopId,
      items: cart[0]?.items,
      totalPrice,
    };
    createProceedToPayment(orderData);
  };

  useEffect(() => {
    const redirectToStripe = async () => {
      if (isSuccess && stripeData?.data?.sessionId) {
        const stripe = await loadStripe(
          "pk_test_51OER86HEX9A0fqDWpBfD9mXrFNPdZhi2JvaRHjZLWnjeN3VdNnt0ai2kCD4cnOjR655KhcOPLrNCxeZkqPO6L2t900GjzCjnxa"
        );
        await stripe?.redirectToCheckout({
          sessionId: stripeData?.data?.sessionId,
        });
      }
    };

    redirectToStripe();
  }, [isSuccess, stripeData]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="max-w-screen-xl mx-auto px-3 py-4">
        <h2 className="text-xl md:text-2xl font-medium mb-3 text-gray-700">
          Checkout
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="py-2 space-y-2 w-full">
            <h2 className="text-xl md:text-2xl font-medium mb-3 text-gray-700">
              Items
            </h2>
            {cart[0]?.items?.map((item: ICartItem) => (
              <div
                key={item.id}
                className="p-2 rounded-lg bg-gray-100 flex gap-2"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                />

                <div className="w-full flex justify-between">
                  <h3 className="text-gray-700 text-lg font-medium">
                    {item.name}
                  </h3>
                  <h2 className="text-gray-800 text-xl font-bold">
                    $ {item.price}
                  </h2>
                </div>
              </div>
            ))}
            <h2 className="text-xl mt-2 text-gray-700">
              Subtotal Price: <span className="font-bold">$ {totalPrice}</span>
            </h2>
          </div>

          <div className="w-full">
            <div className="w-full">
              <h2 className="text-xl md:text-2xl font-medium mb-3 text-gray-700">
                Coupon
              </h2>
              <CMForm onSubmit={onSubmit}>
                <div className="flex gap-2 items-center">
                  <CMInput
                    required={true}
                    label="Enter your coupon code"
                    name="coupon"
                    size="sm"
                    type="text"
                  />
                  <Button color="primary" type="submit">
                    Apply
                  </Button>
                </div>
              </CMForm>
            </div>
            <div className="py-3 border-y my-3">
              <h2 className="text-lg font-semibold">
                Subtotal: $ {totalPrice}
              </h2>
              <h2 className="text-lg font-semibold">Discount: $ {0}</h2>
              <h2 className="text-lg font-semibold">
                Total price: $ {totalPrice}
              </h2>

              <Button
                onClick={handleCreateOrder}
                color="primary"
                className="mt-2 min-w-[160px]"
              >
                {isPending ? "Processing..." : "Proceed to payment"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
