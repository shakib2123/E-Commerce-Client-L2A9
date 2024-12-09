export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  className?: string;
  isDisabled?: boolean;
}

export type TCategory = {
  id: string;
  name: string;
  description: string;
};
