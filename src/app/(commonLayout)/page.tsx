"use client";
import ScrollToTopButton from "@/components/shared/ScrollTopButton";
import useDebounce from "@/hooks/debounce.hook";
import { Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";

const HomePage = () => {
  const [sortValue, setSortValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue);

  return (
    <section className="max-w-screen-xl mx-auto px-3">
      <ScrollToTopButton />
      <div className="my-4 bg-orange-100 p-2 rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <Input
            name="search"
            size="sm"
            variant="faded"
            label="Search"
            className="text-gray-800 md:w-[70%]"
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <Select
            onChange={(e) => setFilterValue(e.target.value)}
            label="Filter by"
            size="sm"
            variant="faded"
            placeholder="Select Category"
            className="md:max-w-xs"
          >
            <SelectItem key={"dog"}>dog</SelectItem>
          </Select>

          <div className="flex items-center gap-4">
            <Input
              name="minPrice"
              size="sm"
              variant="faded"
              label="Min Price"
              className="text-gray-800"
              // onChange={(e) => setSearchValue(e.target.value)}
            />
            <Input
              name="maxPrice"
              size="sm"
              variant="faded"
              label="Max Price"
              className="text-gray-800"
              // onChange={(e) => setSearchValue(e.target.value)}
            />
            <Tooltip content="Reset Filters">
              <button className="p-3 text-gray-800 rounded-xl bg-gray-100">
                <FaArrowRotateLeft className="text-2xl" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
