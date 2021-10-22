import { ChangeEvent } from "react";

export interface TextFieldProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  label?: string;
  variant?: "filled" | "outlined" | "standard";
  margin?: "none" | "dense" | "normal";
  required?: boolean;
  requiredErrorText?: string;
  fullWidth?: boolean;
  end?: boolean;
}
