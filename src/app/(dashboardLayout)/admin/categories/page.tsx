"use client";

import CreateCategoryModal from "@/components/modals/CreateCategoryModal";
import UpdateCategoryModal from "@/components/modals/UpdateCategoryModal";
import { useGetAllCategories } from "@/hooks/category.hook";
import { ICategory } from "@/types";
import {
  Button,
  Spinner,
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
            <TableBody emptyContent={"No data to display."}>
              {categories?.data?.map((category: ICategory) => (
                <TableRow key={category?.id}>
                  <TableCell className="min-w-[150px] md:min-w-full">
                    {category?.name}
                  </TableCell>
                  <TableCell className="min-w-[350px] md:min-w-full">
                    {category?.description}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <UpdateCategoryModal category={category} />
                    <Button color="danger" size="sm" variant="shadow">
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

export default ProductCategories;
