import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, FormControl, InputLabel, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

interface InputDateFieldProps {
  name: string;
  label?: string;
  initialValue?: dayjs.Dayjs;
}

const InputDateField: React.FC<InputDateFieldProps> = ({
  name,
  label,
  initialValue,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box marginBottom={2}>
      <FormControl fullWidth variant="outlined" error={!!errors[name]}>
        {label && (
          <InputLabel htmlFor={name} shrink={true}>
            {label}
          </InputLabel>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue={initialValue}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                defaultValue={initialValue || null}
                value={field.value || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors[name]}
                    helperText={
                      errors[name]
                        ? (errors[name] as { message?: string }).message
                        : null
                    }
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />
      </FormControl>
    </Box>
  );
};

export default InputDateField;
