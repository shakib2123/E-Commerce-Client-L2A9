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

export default function Navbar() {
  const router = useRouter();

  const pathname = usePathname();

  const { user, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route: string) => pathname.match(route))) {
      router.push("/");
    }
  };

  const userRole = user?.role === "USER" ? "user" : "admin";

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
          <Link
            href="/shop"
            aria-current="page"
            className={
              pathname === "/shop"
                ? "text-white border-b-2 font-medium border-white duration-100 transition-colors hover:text-gray-200/90"
                : "text-gray-200 hover:text-gray-200/90"
            }
          >
            Shop
          </Link>
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
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
        className="sm:hidden basis-1 pl-4 text-white"
        justify="end"
      >
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="bg-black/10 text-gray-900">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem>
            <Link href="/" className="w-full h-full">
              <Button
                color={pathname === "/" ? "primary" : "default"}
                className="w-full h-full"
              >
                Home
              </Button>
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem>
            <Link href={`${userRole}/dashboard`} className="w-full h-full">
              <Button
                color={
                  pathname === `${userRole}/dashboard` ? "primary" : "default"
                }
                className="w-full h-full"
              >
                Dashboard
              </Button>
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem>
            <Link href="/shop" aria-current="page" className="w-full h-full">
              <Button
                color={pathname === "/shop" ? "primary" : "default"}
                className="w-full h-full"
              >
                Shop
              </Button>
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem>
            <Button
              onClick={() => handleLogout()}
              className="text-gray-50 w-full"
              color="danger"
            >
              Logout
            </Button>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
