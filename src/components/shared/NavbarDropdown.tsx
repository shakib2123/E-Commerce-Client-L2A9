"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/AuthService";

import { protectedRoutes } from "@/constant/constant";
import { useGetCurrentUser } from "@/hooks/user.hook";

export default function NavbarDropdown() {
  const router = useRouter();

  const pathname = usePathname();

  const { data: userData } = useGetCurrentUser();

  const user = userData?.data || {};

  console.log(user);

  const { setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
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
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" src={user?.profilePhoto} />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        className="text-gray-900 hover:text-gray-700"
      >
        <DropdownItem href={`/${userRole}/dashboard`} className="w-full">
          Dashboard
        </DropdownItem>
        <DropdownItem href={`/profile`} className="w-full">
          Profile
        </DropdownItem>
        <DropdownItem
          onClick={() => handleLogout()}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
