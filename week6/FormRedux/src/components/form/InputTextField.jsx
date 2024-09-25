import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const InputTextField = ({
  name,
  control,
  errors,
  label,
  InputProps,
  type,
  showPasswordToggle,
  onToggle,
  ...props
}) => {
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
          type={
            showPasswordToggle ? (type === "password" ? "text" : type) : type
          }
          error={!!errors[name]}
          helperText={errors[name]?.message}
          InputProps={
            showPasswordToggle
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={onToggle}>
                        {showPasswordToggle ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : undefined
          }
        />
      )}
    />
  );
};

export default InputTextField;
