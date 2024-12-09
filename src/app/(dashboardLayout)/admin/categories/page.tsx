"use client";

import CreateCategoryModal from "@/components/modals/CreateCategoryModal";

const ProductCategories = () => {
  return (
    <section className="max-w-screen-xl mx-auto py-4">
      <h1 className="text-xl md:text-2xl font-medium">Product Categories!</h1>
      {/* modal */}
      <CreateCategoryModal />
    </section>
  );
};

export default ProductCategories;
