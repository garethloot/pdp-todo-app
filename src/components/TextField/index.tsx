import React, { useState } from "react";
import { TextField as MuiTextField } from "@material-ui/core";

import { useStyles } from "./style";
import { TextFieldProps } from "./types";

const TextField: React.FC<TextFieldProps> = ({
  value,
  type,
  name,
  label,
  variant,
  margin,
  fullWidth,
  onChange,
  required,
  requiredErrorText,
  end,
}) => {
  const classes = useStyles();
  const [error, setError] = useState<{
    has: boolean;
    text: string | undefined;
  }>({
    has: false,
    text: "",
  });

  const handleValidation = (eventValue: string) => {
    if (required && eventValue === "") {
      setError({
        has: true,
        text: requiredErrorText || "This field is required!",
      });
    } else {
      setError({ has: false, text: "" });
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleValidation(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };
  return (
    <MuiTextField
      className={[end && classes.end].join(" ")}
      value={value}
      name={name}
      type={type}
      required={required}
      label={label}
      error={error.has}
      variant={variant}
      margin={margin}
      fullWidth={fullWidth}
      helperText={error.text}
      onChange={changeHandler}
    />
  );
};

export default TextField;
