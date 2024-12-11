"use client";

import { useGetAllUsers } from "@/hooks/user.hook";
import { IUser } from "@/types";
import {
  Avatar,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { format } from "date-fns";
const columns = [
  {
    key: "photo",
    label: "Photo",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
    label: "Role",
  },

  {
    key: "createdAt",
    label: "Created At",
  },
  {
    key: "lastLogin",
    label: "Last Login",
  },
];

const ActivityLogs = () => {
  const { data: users, isLoading } = useGetAllUsers({ status: "all" });

  return (
    <section className="max-w-screen-xl mx-auto">
      <h1 className="text-xl md:text-2xl font-medium mb-4">
        All Users Activities!
      </h1>

      {/* users activity logs */}
      <div className="mt-4">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-80">
            <Spinner size="lg" />
          </div>
        ) : (
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {users?.data?.map((user: IUser) => (
                <TableRow key={user?.id}>
                  <TableCell>
                    <Avatar isBordered radius="sm" src={user?.profilePhoto} />
                  </TableCell>
                  <TableCell className="min-w-[150px] lg:min-w-full">
                    {user?.name}
                  </TableCell>
                  <TableCell className="min-w-[180px] lg:min-w-full">
                    {user?.email}
                  </TableCell>
                  <TableCell>{user?.role}</TableCell>
                  <TableCell className="min-w-[150px] lg:min-w-full">
                    {format(user?.createdAt, "hh:mm aa - MMMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="min-w-[150px] lg:min-w-full">
                    {format(user?.lastLogin, "hh:mm aa - MMMM dd, yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
};

export default ActivityLogs;
