import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const InputField = ({ name, control, errors, label, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          fullWidth
          label={label}
          variant="outlined"
          error={!!errors[name]}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
};

export default InputField;
