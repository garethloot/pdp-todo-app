export interface TextFieldProps {
  value: string;
  onChange?: Function;
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
