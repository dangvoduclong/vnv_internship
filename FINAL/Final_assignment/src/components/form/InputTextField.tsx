import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface InputTextFieldProps {
  name: string;
  placeholder: string;
  type?: string;
  label?: string;
  InputProps?: object;
}

const InputTextField: React.FC<InputTextFieldProps> = ({
  name,
  placeholder,
  type = "text",
  label,
  InputProps,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
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
          render={({ field }) => (
            <TextField
              {...field}
              id={name}
              placeholder={placeholder}
              variant="outlined"
              fullWidth
              type={showPassword && type === "password" ? "text" : type}
              error={!!errors[name]}
              helperText={
                errors[name]
                  ? (errors[name] as { message?: string }).message
                  : null
              }
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "green",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "green",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "gray",
                  "&.Mui-focused": {
                    color: "blue",
                  },
                  "&:hover": {
                    color: "blue",
                  },
                },
                marginTop: 1.5,
              }}
            />
          )}
        />
      </FormControl>
    </Box>
  );
};

export default InputTextField;
