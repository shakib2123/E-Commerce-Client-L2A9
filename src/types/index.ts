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
}

export interface IShop {
  id: string;
  name: string;
  description: string;
  logo: string;
  email: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}
