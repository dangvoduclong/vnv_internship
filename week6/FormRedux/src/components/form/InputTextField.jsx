import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const InputTextField = ({
  name,
  label,
  InputProps,
  type,
  showPasswordToggle,
  onToggle,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
          type={showPasswordToggle && type === "password" ? "text" : type}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          InputProps={{
            ...InputProps,
            endAdornment:
              type === "password" ? (
                <InputAdornment position="end">
                  <IconButton onClick={onToggle}>
                    {showPasswordToggle ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
        />
      )}
    />
  );
};

export default InputTextField;
