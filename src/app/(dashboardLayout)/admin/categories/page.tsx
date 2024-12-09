"use client";

import CreateCategoryModal from "@/components/modals/CreateCategoryModal";
import { useGetAllCategories } from "@/hooks/category.hook";
import { TCategory } from "@/types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const columns = [
  {
    key: "categoryName",
    label: "Category Name",
  },
  {
    key: "categoryDescription",
    label: "Category Description",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const ProductCategories = () => {
  const { data: categories, isLoading, isSuccess } = useGetAllCategories();
  console.log(categories?.data);

  return (
    <section className="max-w-screen-xl mx-auto py-4">
      <h1 className="text-xl md:text-2xl font-medium mb-4">
        Product Categories!
      </h1>

      {/* modal */}
      <CreateCategoryModal />

      {/* get all categories */}
      <div className="mt-4">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No data to display."}>
            {categories?.data?.map((category: TCategory) => (
              <TableRow key={category?.id}>
                <TableCell>{category?.name}</TableCell>
                <TableCell>{category?.description}</TableCell>
                <TableCell className="flex gap-2">
                  <Button color="primary" size="sm" variant="shadow">
                    Edit
                  </Button>
                  <Button color="danger" size="sm" variant="shadow">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ProductCategories;
