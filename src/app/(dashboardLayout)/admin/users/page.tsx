"use client";

import { useGetAllUsers } from "@/hooks/user.hook";
import { IUser } from "@/types";
import {
  Avatar,
  Button,
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
    key: "isDeleted",
    label: "Is Deleted",
  },
  {
    key: "isBlocked",
    label: "Is Blocked",
  },
  {
    key: "createdAt",
    label: "Created At",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const ManageUsers = () => {
  const { data: users, isLoading } = useGetAllUsers();
  return (
    <section className="max-w-screen-xl mx-auto">
      <h1 className="text-xl md:text-2xl font-medium mb-4">All Users!</h1>
      <h1 className="text-lg font-medium">
        Total Users: {users?.data?.length || 0}
      </h1>
      {/* users table */}
      <div>
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
                  <TableCell>
                    {user?.isDeleted ? (
                      <span className="text-red-500">Yes</span>
                    ) : (
                      <span className="text-green-500">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {user?.isBlocked ? (
                      <span className="text-red-500">Yes</span>
                    ) : (
                      <span className="text-green-500">No</span>
                    )}
                  </TableCell>
                  <TableCell className="min-w-[150px] lg:min-w-full">
                    {format(user?.createdAt, "hh:mm aa - MMMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" className="min-w-[85px]" color="warning">
                      Suspend
                    </Button>
                    <Button size="sm" className="min-w-[85px]" color="danger">
                      Delete
                    </Button>
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

export default ManageUsers;
