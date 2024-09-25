import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";

const CheckboxGroupField = ({ control, errors, name, options }) => {
  return (
    <FormControl component="fieldset" error={!!errors[name]}>
      <FormLabel component="legend">Role</FormLabel>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Controller
                name={`${name}`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    checked={value?.includes(option.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange([...value, option.value]);
                      } else {
                        onChange(value.filter((v) => v !== option.value));
                      }
                    }}
                  />
                )}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      <FormHelperText>{errors[name]?.message}</FormHelperText>
      {/* Show error message */}
    </FormControl>
  );
};

export default CheckboxGroupField;
