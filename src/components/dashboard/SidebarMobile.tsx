"use client";
import Logo from "@/assets/logo.png";

import { dashboardRoutes, protectedRoutes } from "@/constant/constant";
import { useUser } from "@/context/user.provider";
import { useGetCurrentUser } from "@/hooks/user.hook";
import { logout } from "@/services/AuthService";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  Skeleton,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoLockClosed } from "react-icons/io5";
import MyUser from "../shared/MyUser";
import Image from "next/image";

const SidebarMobile = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: userData, isLoading: isUserLoading } = useGetCurrentUser();
  const { setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <div>
      <NextUINavbar
        maxWidth="xl"
        position="sticky"
        className="bg-orange-600 lg:hidden"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <Link className="flex justify-start items-center gap-1" href="/">
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
        </NavbarContent>

        <NavbarContent className="basis-1 pl-4 text-gray-100" justify="end">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu className="bg-slate-200/70 text-gray-900">
          <div className="h-full flex flex-col justify-between">
            {/* routes */}
            <div className="py-4 space-y-2">
              {isUserLoading
                ? [1, 2, 3, 4, 5].map((item) => (
                    <div key={item}>
                      <Skeleton className="rounded-lg w-60 h-14" />
                    </div>
                  ))
                : dashboardRoutes[
                    userData?.data?.role as keyof typeof dashboardRoutes
                  ]?.map((route) => (
                    <Link key={route.path} href={route.path}>
                      <div
                        key={route.path}
                        className={`w-full p-4  duration-100 transition-all font-medium rounded-lg flex items-center gap-2 ${
                          pathname === route.path
                            ? "bg-primary-100 text-primary"
                            : "hover:bg-slate-100 hover:text-primary-500"
                        }`}
                      >
                        {route.icon} {route.name}
                      </div>
                    </Link>
                  ))}
            </div>

            <div className=" py-4 border-t border-gray-500 space-y-3">
              {isUserLoading ? (
                <div className="max-w-[300px] w-full flex items-center gap-3">
                  <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                  </div>
                </div>
              ) : (
                <MyUser
                  name={userData?.data?.name}
                  description={userData?.data?.email}
                  src={userData?.data?.profilePhoto}
                />
              )}
              <div
                onClick={handleLogout}
                className={`w-full p-4  duration-100 transition-all font-medium rounded-lg flex items-center gap-2 hover:bg-slate-100`}
              >
                <IoLockClosed size={20} />
                <p className="font-medium text-gray-600">Logout</p>
              </div>
            </div>
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </div>
  );
};

export default SidebarMobile;
