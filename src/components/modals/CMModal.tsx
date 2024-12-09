import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { ReactNode, useEffect } from "react";

interface IProps {
  buttonText: string | ReactNode;
  buttonSize?: "sm" | "md" | "lg";
  buttonColor?:
    | "default"
    | "danger"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | undefined;
  title: string;
  children: ReactNode;
  buttonVariant?:
    | "light"
    | "solid"
    | "bordered"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  buttonClassName?: string;
  isDismissable?: boolean;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  closeModal?: boolean;
}

export default function CMModal({
  buttonText,
  buttonSize = "md",
  buttonColor = "default",
  buttonVariant = "solid",
  buttonClassName,
  isDismissable = true,
  title,
  children,
  size = "xl",
  closeModal = false,
}: IProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    if (closeModal) {
      onClose();
    }
  }, [closeModal, onClose]);

  return (
    <>
      <Button
        size={buttonSize}
        color={buttonColor}
        className={buttonClassName}
        variant={buttonVariant}
        onPress={onOpen}
      >
        {buttonText}
      </Button>
      <Modal
        size={size}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={isDismissable}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
