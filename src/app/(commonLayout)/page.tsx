"use client";
import FlashSaleProducts from "@/components/home/FlashSaleProducts";
import Categories from "@/components/shared/Categories";
import ProductCard from "@/components/shared/ProductCard";
import ScrollToTopButton from "@/components/shared/ScrollTopButton";
import { useGetAllCategories } from "@/hooks/category.hook";
import useDebounce from "@/hooks/debounce.hook";
import { useGetAllProducts } from "@/hooks/product.hook";
import { ICategory, IProduct } from "@/types";
import { Input, Select, SelectItem, Tooltip } from "@nextui-org/react";

import { useEffect, useState } from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";

const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [resetForm, setResetForm] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue);

  const buildQuery = () => {
    const queryParams: string[] = [];

    if (debouncedSearchValue)
      queryParams.push(`searchTerm=${debouncedSearchValue}`);
    if (categoryId) queryParams.push(`categoryId=${categoryId}`);
    if (minPrice) queryParams.push(`minPrice=${minPrice}`);
    if (maxPrice) queryParams.push(`maxPrice=${maxPrice}`);
    return queryParams.length ? `?${queryParams.join("&")}` : "";
  };

  const { data: categories, isLoading: isCategoryLoading } =
    useGetAllCategories();

  const {
    data: products,
    isLoading: isProductLoading,
    refetch,
  } = useGetAllProducts(buildQuery());

  useEffect(() => {
    refetch();
  }, [refetch, debouncedSearchValue, minPrice, maxPrice, categoryId]);

  console.log(products);

  const categoryData = categories?.data?.map((category: ICategory) => ({
    key: category?.id,
    label: category?.name,
  }));

  return (
    <section className="max-w-screen-xl mx-auto px-3">
      <ScrollToTopButton />
      <div className="my-4 bg-primary-100 p-2 rounded-lg">
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
          <div className="flex items-center gap-4 w-full">
            <Input
              name="search"
              size="sm"
              variant="faded"
              label="Search"
              className="text-gray-800 lg:w-[70%] flex-1"
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <Select
              onChange={(e) => setCategoryId(e.target.value)}
              label="Filter by"
              size="sm"
              variant="faded"
              placeholder="Select Category"
              className="md:max-w-xs flex-1"
              isDisabled={isCategoryLoading}
            >
              {categoryData?.map((category: { key: string; label: string }) => (
                <SelectItem key={category.key}>{category.label}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Input
              name="minPrice"
              size="sm"
              variant="faded"
              label="Min Price"
              className="text-gray-800"
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              name="maxPrice"
              size="sm"
              variant="faded"
              label="Max Price"
              className="text-gray-800"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <Tooltip content="Reset Filters">
              <button
                onClick={() => {
                  setCategoryId("");
                  setMaxPrice("");
                  setMinPrice("");
                  setSearchValue("");
                }}
                className="p-3 text-gray-700 rounded-xl bg-gray-100"
              >
                <FaArrowRotateLeft className="text-xl" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Categories */}
      <Categories />

      <FlashSaleProducts />

      {/* products */}
      <div className="py-8">
        <h2 className="text-xl md:text-2xl font-medium mb-1">Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {products?.data?.map((product: IProduct) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
