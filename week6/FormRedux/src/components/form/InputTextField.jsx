import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
const InputTextField = ({
  name,
  label,
  InputProps,
  type,
  showPasswordToggle,
  onToggle,
  control,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const {
    control: controlContext,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control || controlContext}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          fullWidth
          label={label}
          variant="outlined"
          type={showPassword && type === "password" ? "text" : type}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          InputProps={{
            ...InputProps,
            endAdornment:
              type === "password" ? (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
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
