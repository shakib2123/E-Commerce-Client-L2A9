"use client";
import {
  Button,
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import Link from "next/link";

import Logo from "@/assets/logo.png";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/AuthService";

import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import NavbarDropdown from "./NavbarDropdown";
import { protectedRoutes } from "@/constant/constant";
import { FaCartShopping } from "react-icons/fa6";
import { useGetCurrentUser } from "@/hooks/user.hook";

export default function Navbar() {
  const router = useRouter();

  const pathname = usePathname();

  const { user, setIsLoading: userLoading } = useUser();
  const { data: userInfo, isSuccess } = useGetCurrentUser();
  console.log(userInfo);
  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route: string) => pathname.match(route))) {
      router.push("/");
    }
  };

  let userRole;

  if (user?.role === "VENDOR") {
    userRole = "vendor";
  } else if (user?.role === "USER") {
    userRole = "user";
  } else if (user?.role === "ADMIN") {
    userRole = "admin";
  }

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="bg-orange-600">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit md:mr-12">
          <Link className="flex justify-start items-center" href="/">
            <Image
              src={Logo}
              alt="Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <h2 className="font-bold text-lg md:text-xl text-inherit text-white">
              ClickMart
            </h2>
          </Link>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          <Link
            href="/"
            aria-current="page"
            className={
              pathname === "/"
                ? "text-white border-b-2 font-medium border-white duration-100 transition-colors hover:text-gray-200/90"
                : "text-gray-200 hover:text-gray-200/90"
            }
          >
            Home
          </Link>

          {userRole === "vendor" && isSuccess && (
            <Link
              href={`/shop/${userInfo?.data?.shop?.id}`}
              aria-current="page"
              className={
                pathname === `/shop/${userInfo?.data?.shop?.id}`
                  ? "text-white border-b-2 font-medium border-white duration-100 transition-colors hover:text-gray-200/90"
                  : "text-gray-200 hover:text-gray-200/90"
              }
            >
              Shop
            </Link>
          )}

          <Link
            href="/all-products"
            aria-current="page"
            className={
              pathname === "/all-products"
                ? "text-white border-b-2 font-medium border-white duration-100 transition-colors hover:text-gray-200/90"
                : "text-gray-200 hover:text-gray-200/90"
            }
          >
            All Products
          </Link>
          <Link
            href="/flash-sales"
            aria-current="page"
            className={
              pathname === "/flash-sales"
                ? "text-white border-b-2 font-medium border-white duration-100 transition-colors hover:text-gray-200/90"
                : "text-gray-200 hover:text-gray-200/90"
            }
          >
            Flash Sales
          </Link>
          <Link
            href="/contact"
            aria-current="page"
            className={
              pathname === "/contact"
                ? "text-white border-b-2 font-medium border-white duration-100 transition-colors hover:text-gray-200/90"
                : "text-gray-200 hover:text-gray-200/90"
            }
          >
            Contact Us
          </Link>
          <Link
            href="/about"
            aria-current="page"
            className={
              pathname === "/about"
                ? "text-white border-b-2 font-medium border-white duration-100 transition-colors hover:text-gray-200/90"
                : "text-gray-200 hover:text-gray-200/90"
            }
          >
            About Us
          </Link>
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden lg:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link href={"/cart"} className="p-2 rounded-lg">
            <FaCartShopping className="text-gray-50 hover:text-gray-200 text-2xl" />
          </Link>
        </NavbarItem>
        {user?.email ? (
          <NavbarItem className="hidden sm:flex gap-2">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex gap-2">
            <Link href={"/login"}>
              <Button color="primary">Login</Button>
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent
        className="lg:hidden basis-1 pl-4 text-white"
        justify="end"
      >
        <Link href={"/cart"} className="p-2 rounded-lg">
          <FaCartShopping className="text-gray-50 hover:text-gray-200 text-2xl" />
        </Link>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="bg-black/5 text-gray-900">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem>
            <Link
              href="/"
              aria-current="page"
              className={`py-1 flex justify-center
                ${pathname === "/" ? "text-primary font-medium" : "text-black"}
              `}
            >
              <span>Home</span>
            </Link>
          </NavbarMenuItem>
          {userRole === "vendor" && isSuccess && (
            <NavbarMenuItem>
              <Link
                href={`/shop/${userInfo?.data?.shop?.id}`}
                className={`py-1 flex justify-center
                ${
                  pathname === `/shop/${userInfo?.data?.shop?.id}`
                    ? "text-primary font-medium"
                    : "text-black"
                }
              `}
              >
                <span>Shop</span>
                Shop
              </Link>
            </NavbarMenuItem>
          )}

          <NavbarMenuItem>
            <Link
              href="/all-products"
              className={`py-1 flex justify-center
                ${
                  pathname === "/all-products"
                    ? "text-primary font-medium"
                    : "text-black"
                }
              `}
            >
              <span>All Products</span>
              Shop
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              href="/flash-sales"
              aria-current="page"
              className={`py-1 flex justify-center
                ${
                  pathname === "/flash-sales"
                    ? "text-primary font-medium"
                    : "text-black"
                }
              `}
            >
              <span>Flash Sales</span>
            </Link>
          </NavbarMenuItem>
          {user && (
            <NavbarMenuItem>
              <Link
                href="/profile"
                aria-current="page"
                className={`py-1 flex justify-center
                  ${
                    pathname === "/profile"
                      ? "text-primary font-medium"
                      : "text-black"
                  }
                `}
              >
                <span>Profile</span>
              </Link>
            </NavbarMenuItem>
          )}

          {user && (
            <NavbarMenuItem>
              <Link
                href={`${userRole}/dashboard`}
                className={`py-1 flex justify-center
                  ${
                    pathname === `${userRole}/dashboard`
                      ? "text-primary font-medium"
                      : "text-black"
                  }
                `}
              >
                <span>Dashboard</span>
              </Link>
            </NavbarMenuItem>
          )}

          <NavbarMenuItem>
            <Link
              href="/contact"
              className={`py-1 flex justify-center
                  ${
                    pathname === "/contact"
                      ? "text-primary font-medium"
                      : "text-black"
                  }
                `}
            >
              <span>Contact Us</span>
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem>
            <Link
              href="/about"
              className={`py-1 flex justify-center
                  ${
                    pathname === "/about"
                      ? "text-primary font-medium"
                      : "text-black"
                  }
                `}
            >
              <span>About Us</span>
            </Link>
          </NavbarMenuItem>

          {user ? (
            <NavbarMenuItem>
              <Button
                onClick={() => handleLogout()}
                className="text-gray-50 w-full"
                color="danger"
              >
                Logout
              </Button>
            </NavbarMenuItem>
          ) : (
            <Link href={"/login"}>
              <Button color="primary" className="w-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
