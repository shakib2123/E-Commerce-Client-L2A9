import { useUpdateProduct } from "@/hooks/product.hook";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CMModal from "./CMModal";
import CMForm from "../form/CMForm";
import CMInput from "../form/CMInput";
import { Button, Spinner } from "@nextui-org/react";

const FlashSaleModal = ({ productId }: { productId: string }) => {
  const { mutate: updateProduct, isPending, isSuccess } = useUpdateProduct();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const productData = {
      flashSalePrice: Number(data.flashSalePrice),
      isFlashSale: true,
    };
    console.log(productData, productId);
    updateProduct({ id: productId, payload: productData });
  };

  return (
    <div>
      <CMModal
        title="Add this product in flash sale"
        buttonText="Add to Flash Sale"
        buttonColor="primary"
        buttonSize="sm"
        closeModal={isSuccess && !isPending}
      >
        <CMForm onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <CMInput
              label="Flash Sale Price"
              name="flashSalePrice"
              required={true}
            />

            <Button type="submit" className="w-full" color="primary">
              {isPending ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Add to Flash Sale"
              )}
            </Button>
          </div>
        </CMForm>
      </CMModal>
    </div>
  );
};

export default FlashSaleModal;
