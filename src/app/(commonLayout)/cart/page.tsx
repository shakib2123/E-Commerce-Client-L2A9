"use client";
import { getCart, ICartItem } from "@/services/CartService";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  const cart = getCart();
  console.log(cart[0]?.items);

  const totalPrice = cart[0]?.items.reduce(
    (total: number, item: ICartItem) => total + item.price,
    0
  );

  return (
    <section className="max-w-screen-xl mx-auto px-3 py-4">
      <div className="border-b pb-1 flex justify-between px-3">
        <h2 className="text-xl md:text-2xl font-medium mb-3 text-gray-700">
          Shopping Cart
        </h2>
        <p className="text-gray-600 text-right">price</p>
      </div>
      <div className="py-2 space-y-2 border-b">
        {cart[0]?.items?.map((item: ICartItem) => (
          <div key={item.id} className="p-2 rounded-lg bg-gray-100 flex gap-2">
            <Image src={item.image} alt={item.name} width={100} height={100} />

            <div className="w-full flex justify-between">
              <h3 className="text-gray-700 text-lg font-medium">{item.name}</h3>
              <h2 className="text-gray-800 text-xl font-bold">
                $ {item.price}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-end mt-2">
        <h2 className="text-xl mb-3 text-gray-700">
          Total Price: <span className="font-bold">$ {totalPrice}</span>
        </h2>

        <Link href="/checkout">
          <Button color="primary">Proceed to Checkout</Button>
        </Link>
      </div>
    </section>
  );
};

export default Cart;
