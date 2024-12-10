"use client";

import CreateCategoryModal from "@/components/modals/CreateCategoryModal";
import DeleteCategoryModal from "@/components/modals/DeleteCategoryModal";
import UpdateCategoryModal from "@/components/modals/UpdateCategoryModal";
import { useGetAllCategories } from "@/hooks/category.hook";
import { ICategory } from "@/types";
import {
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
  const { data: categories, isLoading } = useGetAllCategories();

  return (
    <section className="max-w-screen-xl mx-auto">
      <h1 className="text-xl md:text-2xl font-medium mb-4">
        Product Categories!
      </h1>

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
        <h1 className="text-lg font-medium">
          Total Categories: {categories?.data?.length || 0}
        </h1>
        {/* modal */}
        <CreateCategoryModal />
      </div>

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
                    <DeleteCategoryModal id={category?.id} />
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
