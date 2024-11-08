import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormHelperText,
} from "@mui/material";

interface InputSelectFieldProps {
  name: string;
  placeholder: string;
  label: string;
  options: { value: string; label: string }[];
  initialValue?: string;
}

const InputSelectField: React.FC<InputSelectFieldProps> = ({
  name,
  label,
  placeholder,
  options,
  initialValue,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box marginBottom={2}>
      <FormControl fullWidth variant="outlined" error={!!errors[name]}>
        <InputLabel htmlFor={name} shrink={true}>
          {label}
        </InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={initialValue}
          render={({ field }) => (
            <Select
              {...field}
              placeholder={placeholder}
              sx={{
                "&:hover": {
                  borderColor: "red",
                },
                "&.Mui-focused": {
                  borderColor: "green",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "grey",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "green",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
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

export default InputSelectField;
