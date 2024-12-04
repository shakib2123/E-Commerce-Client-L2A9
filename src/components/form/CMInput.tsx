"use client";

import { IInput } from "@/types";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

export default function CMInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  className,
  isDisabled = false,
}: IInput) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      required={required}
      size={size}
      type={type}
      variant={variant}
      className={className}
      isDisabled={isDisabled}
    />
  );
}
