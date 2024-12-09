"use client";

import { IInput } from "@/types";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

// Define the TItems type
export type TItemData = {
  key: string;
  label: string;
};

export interface CMSelectProps extends IInput {
  itemData: TItemData[];
}

export default function CMSelect({
  variant = "bordered",
  size = "md",
  required = false,
  label,
  name,
  className,
  isDisabled = false,
  itemData,
}: CMSelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Autocomplete
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      required={required}
      size={size}
      variant={variant}
      className={className}
      isDisabled={isDisabled}
    >
      {itemData?.map((item) => (
        <AutocompleteItem key={item?.key}>{item?.label}</AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
