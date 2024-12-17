import { IProduct } from "@/types";
import { toast } from "sonner";

export interface ICartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ICart {
  shopId: string;
  items: ICartItem[];
}

export const getCart = () => {
  const cart = localStorage.getItem("click_mart_cart");
  return cart ? JSON.parse(cart) : [];
};

const saveCart = (cart: ICart[]) => {
  localStorage.setItem("click_mart_cart", JSON.stringify(cart));
};

export const addToCart = (product: IProduct) => {
  const cart = getCart();

  if (cart.length === 0) {
    const newCart = [
      {
        shopId: product.shopId,
        items: [
          {
            id: product?.id,
            name: product?.name,
            image: product?.images[0],
            price: product?.price,
            quantity: 1,
          },
        ],
      },
    ];
    saveCart(newCart);
    toast.success("Product added to cart.");
    return;
  }

  const existingShopCart = cart.find((c: ICart) => c.shopId === product.shopId);

  if (!existingShopCart) {
    const userChoice = window.confirm(
      "Adding this product will replace your cart. Do you want to continue?"
    );

    if (userChoice) {
      saveCart([
        {
          shopId: product.shopId,
          items: [
            {
              id: product?.id,
              name: product?.name,
              image: product?.images[0],
              price: product?.price,
              quantity: 1,
            },
          ],
        },
      ]);
      toast.success("Cart replaced with the new product.");
    } else {
      toast.warning("Product addition canceled.");
    }
    return;
  }

  const productIndex = existingShopCart.items.findIndex(
    (item: IProduct) => item.id === product.id
  );

  if (productIndex > -1) {
    existingShopCart.items[productIndex].quantity += 1;
    toast.success("Product quantity increased.");
  } else {
    existingShopCart.items.push({
      id: product?.id,
      name: product?.name,
      image: product?.images[0],
      price: product?.price,
      quantity: 1,
    });
    toast.success("Product added to cart.");
  }

  saveCart(cart);
};
