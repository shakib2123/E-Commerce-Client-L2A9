import { useGetAllCategories } from "@/hooks/category.hook";
import { ICategory } from "@/types";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";

const Categories = () => {
  const { data: categories, isLoading } = useGetAllCategories();

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-xl md:text-2xl font-medium mb-1">Categories</h2>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-48">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 border bg-blue-50 rounded-lg mb-4 p-4">
          {categories?.data?.map((category: ICategory) => (
            <Link
              href={`/all-products?category=${category.id}`}
              key={category.id}
              className="hover:text-primary-600 hover:underline cursor-pointer text-sm "
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
