import { Button, Spinner } from "@nextui-org/react";
import CMModal from "./CMModal";
import { useState } from "react";
import { useDeleteCategory } from "@/hooks/category.hook";

const DeleteCategoryModal = ({ id }: { id: string }) => {
  const [isClose, setIsClose] = useState(false);

  const { mutate: deleteCategory, isPending, isSuccess } = useDeleteCategory();

  const handleCancel = () => {
    setIsClose(true);
    setTimeout(() => setIsClose(false), 200);
  };

  const handleDelete = () => {
    deleteCategory(id);
    if (isSuccess) handleCancel();
  };

  return (
    <div>
      <div>
        <CMModal
          title=""
          buttonText="Delete"
          buttonColor="danger"
          buttonSize="sm"
          closeModal={isClose}
        >
          <div className="min-h-[150px] flex flex-col justify-between items-center">
            <div className="text-center space-y-2">
              <h1 className="text-xl font-semibold">
                Are You Sure You Want To Delete This Category?
              </h1>
              <h2 className="">
                If You Delete This Category You Will Not Be Able To Retrieve It.
              </h2>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleCancel()} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleDelete()} color="danger">
                {isPending ? <Spinner size="sm" color="white" /> : "Delete"}
              </Button>
            </div>
          </div>
        </CMModal>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
