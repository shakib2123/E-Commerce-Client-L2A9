import categoryValidationSchema from "@/schemas/category.schema";
import CMForm from "../form/CMForm";
import CMInput from "../form/CMInput";
import CMModal from "./CMModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Spinner } from "@nextui-org/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreateCategory } from "@/hooks/category.hook";

const CreateCategoryModal = () => {
  const {
    mutate: createCategory,
    isPending: isLoading,
    isSuccess,
  } = useCreateCategory();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const categoryData = {
      name: data.categoryName,
      description: data.categoryDescription,
    };
    createCategory(categoryData);
  };

  return (
    <div>
      <CMModal
        title="Add New Category"
        buttonText="Add Category"
        buttonColor="primary"
        closeModal={isSuccess}
      >
        <CMForm
          onSubmit={handleSubmit}
          resolver={zodResolver(categoryValidationSchema)}
          isReset={isSuccess}
        >
          <div className="flex flex-col gap-4">
            <CMInput label="Category Name" name="categoryName" />
            <CMInput
              label="Category Description (Optional)"
              name="categoryDescription"
            />
            <Button type="submit" className="w-full" color="primary">
              {isLoading ? <Spinner size="sm" color="white" /> : "Add Category"}
            </Button>
          </div>
        </CMForm>
      </CMModal>
    </div>
  );
};

export default CreateCategoryModal;
