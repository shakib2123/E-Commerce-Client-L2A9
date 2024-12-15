import { FaUsers } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";

import {
  MdAdd,
  MdAttachMoney,
  MdCategory,
  MdCompare,
  MdFavorite,
  MdHistory,
  MdHistoryToggleOff,
  MdList,
  MdOutlineDashboard,
  MdRateReview,
  MdShoppingCart,
  MdStore,
  MdStorefront,
} from "react-icons/md";

export const protectedRoutes = ["/user", "/admin", "/vendor", "/profile"];

export const dashboardRoutes = {
  ADMIN: [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <MdOutlineDashboard size={24} />,
    },
    {
      name: "Manage Users",
      path: "/admin/users",
      icon: <FaUsers size={24} />,
    },
    {
      name: "Manage Shops",
      path: "/admin/shops",
      icon: <MdStore size={24} />,
    },
    {
      name: "Product Categories",
      path: "/admin/categories",
      icon: <MdCategory size={24} />,
    },
    {
      name: "Transactions",
      path: "/admin/transactions",
      icon: <MdAttachMoney size={24} />,
    },
    {
      name: "Activity Logs",
      path: "/admin/logs",
      icon: <MdHistory size={24} />,
    },
  ],
  VENDOR: [
    {
      name: "Dashboard",
      path: "/vendor/dashboard",
      icon: <MdOutlineDashboard size={24} />,
    },
    { name: "My Shop", path: "/vendor/shop", icon: <MdStorefront size={24} /> },
    {
      name: "Add Product",
      path: "/vendor/add-product",
      icon: <MdAdd size={24} />,
    },
    { name: "Products", path: "/vendor/products", icon: <MdList size={24} /> },
    {
      name: "Orders",
      path: "/vendor/orders",
      icon: <MdShoppingCart size={24} />,
    },
    {
      name: "Customer Reviews",
      path: "/vendor/reviews",
      icon: <MdRateReview size={24} />,
    },
  ],
  USER: [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: <MdOutlineDashboard size={24} />,
    },
    {
      name: "Profile",
      path: "/user/profile",
      icon: <FaRegCircleUser size={24} />,
    },

    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: <MdOutlineDashboard size={24} />,
    },
    {
      name: "Order History",
      path: "/user/orders",
      icon: <MdHistory size={24} />,
    },
    { name: "Cart", path: "/user/cart", icon: <MdShoppingCart size={24} /> },
    {
      name: "Followed Shops",
      path: "/user/followed-shops",
      icon: <MdFavorite size={24} />,
    },
    {
      name: "Recent Products",
      path: "/user/recent-products",
      icon: <MdHistoryToggleOff size={24} />,
    },
    {
      name: "Compare Products",
      path: "/user/compare",
      icon: <MdCompare size={24} />,
    },
  ],
};
