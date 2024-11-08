import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  TextareaAutosize,
  FormHelperText,
  Box,
} from "@mui/material";

interface InputTextAreaFieldProps {
  name: string;
  placeholder?: string;
  label?: string;
  initialValue?: string;
  rows?: number;
}

const InputTextAreaField: React.FC<InputTextAreaFieldProps> = ({
  name,
  placeholder,
  label,
  initialValue,
  rows = 4,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box marginBottom={2}>
      <FormControl fullWidth variant="outlined" error={!!errors[name]}>
        {label && (
          <InputLabel shrink htmlFor={name}>
            {label}
          </InputLabel>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue={initialValue}
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              id={name}
              placeholder={placeholder}
              rows={rows}
              style={{
                width: "100%",
                border: "1px solid",
                borderColor: errors[name] ? "red" : "gray",
                borderRadius: 4,
                padding: 8,
              }}
            />
          )}
        />
        {errors[name] && (
          <FormHelperText>
            {(errors[name] as { message?: string }).message}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default InputTextAreaField;
