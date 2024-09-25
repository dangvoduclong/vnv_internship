import { Select, FormHelperText, FormControl, InputLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectField = ({ name, control, errors, label, children, ...props }) => {
  return (
    <FormControl fullWidth error={!!errors[name]}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select {...field} {...props}>
            {children}
          </Select>
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
};

export default SelectField;
