export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  className?: string;
  isDisabled?: boolean;
}

export interface ICategory {
  id: string;
  name: string;
  description: string;

  products?: IProduct[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  profilePhoto: string;
  address: string;
  lastLogin: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;

  shop?: IShop;
  // followedShop;
  product?: IProduct[];
  review?: IReview[];
  order?: IOrder[];
}

export interface IShop {
  id: string;
  name: string;
  description: string;
  logo: string;
  bannerImage: string;
  email: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  categoryId: string;
  category?: ICategory;
  shopId: string;
  shop?: IShop;
  userId: string;
  user?: IUser;
  inventoryCount: number;
  images: string[];
  ratingsCount: number;
  isFlashSale: boolean;
  flashSalePrice?: number;
  createdAt: string;
  updatedAt: string;

  reviews?: IReview[];
  orders?: IOrder[];
}

export interface IOrder {
  id: string;
  shopId: string;
  productId: string;
  userId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;

  shop: IShop;
  user: IUser;
  product: IProduct;
}

export interface IReview {
  id: string;
  productId: string;
  product?: IProduct;
  userId: string;
  user?: IUser;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}
