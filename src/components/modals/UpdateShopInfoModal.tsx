import { FieldValues, SubmitHandler } from "react-hook-form";
import CMModal from "./CMModal";
import CMForm from "../form/CMForm";
import CMInput from "../form/CMInput";
import { Button, Spinner } from "@nextui-org/react";
import { IShop } from "@/types";
import { useUpdateShop } from "@/hooks/shop.hook";

const UpdateShopInfoModal = ({ shop }: { shop: IShop }) => {
  const {
    mutate: updateShop,
    isPending: isShopUpdating,
    isSuccess,
  } = useUpdateShop();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const shopData = {
      name: data.shopName,
      description: data.shopDescription,
    };
    updateShop({ id: shop.id, shopData });
  };

  return (
    <div>
      <CMModal
        title="Edit Shop Information"
        buttonText="Edit"
        buttonColor="default"
        buttonSize="sm"
        closeModal={isSuccess && !isShopUpdating}
      >
        <CMForm
          onSubmit={handleSubmit}
          defaultValues={{
            shopName: shop?.name,
            shopDescription: shop?.description,
          }}
        >
          <div className="flex flex-col gap-4">
            <CMInput label="Shop Name" name="shopName" required={true} />
            <CMInput
              label="Shop Description"
              name="shopDescription"
              required={true}
            />
            <Button type="submit" className="w-full" color="primary">
              {isShopUpdating ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update Shop"
              )}
            </Button>
          </div>
        </CMForm>
      </CMModal>
    </div>
  );
};
export default UpdateShopInfoModal;
