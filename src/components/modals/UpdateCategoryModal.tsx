import { ICategory } from "@/types";
import CMForm from "../form/CMForm";
import CMInput from "../form/CMInput";
import CMModal from "./CMModal";
import { Button, Spinner } from "@nextui-org/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUpdateCategory } from "@/hooks/category.hook";

const UpdateCategoryModal = ({ category }: { category: ICategory }) => {
  const { mutate: updateCategory, isPending, isSuccess } = useUpdateCategory();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const categoryData = {
      name: data.categoryName,
      description: data.categoryDescription,
    };
    updateCategory({ id: category.id, categoryData });
  };

  return (
    <div>
      <CMModal
        title="Edit This Category"
        buttonText="Edit"
        buttonColor="primary"
        buttonSize="sm"
        closeModal={isSuccess && !isPending}
      >
        <CMForm
          onSubmit={handleSubmit}
          defaultValues={{
            categoryName: category?.name,
            categoryDescription: category?.description,
          }}
        >
          <div className="flex flex-col gap-4">
            <CMInput
              label="Category Name"
              name="categoryName"
              required={true}
            />
            <CMInput
              label="Category Description (Optional)"
              name="categoryDescription"
            />
            <Button type="submit" className="w-full" color="primary">
              {isPending ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update Category"
              )}
            </Button>
          </div>
        </CMForm>
      </CMModal>
    </div>
  );
};

export default UpdateCategoryModal;
