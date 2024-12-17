"use client";
import { getCart, ICartItem } from "@/services/CartService";
import Image from "next/image";

const Cart = () => {
  const cart = getCart();
  console.log(cart[0]?.items);
  return (
    <section className="max-w-screen-xl mx-auto px-3 py-4">
      <div className="border-b pb-1 flex justify-between">
        <h2 className="text-xl md:text-2xl font-medium mb-3 text-gray-700">
          Shopping Cart
        </h2>
        <p className="text-gray-600 text-right">price</p>
      </div>
      <div className="py-2">
        {cart[0]?.items?.map((item: ICartItem) => (
          <div key={item.id} className="p-2 rounded-lg bg-gray-100 flex gap-2">
            <Image src={item.image} alt={item.name} width={100} height={100} />

            <div className="w-full flex">
              <h3 className="text-gray-700 text-lg font-medium">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cart;
