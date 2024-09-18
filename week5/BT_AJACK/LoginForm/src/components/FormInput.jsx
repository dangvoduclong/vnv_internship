import { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
const FormInput = ({ input, values, handleChange, errors, handleBlur }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const handleMouseUpPassword = (e) => {
    e.preventDefault();
  };
  return (
    <div className="mb-4">
      {input.type === "radio" ? (
        <>
          <FormLabel>{input.label}</FormLabel>
          <RadioGroup
            name={input.name}
            value={values[input.name]}
            onChange={handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
          {errors[input.name] && (
            <p className="text-red-500">{errors[input.name]}</p>
          )}
        </>
      ) : input.type === "password" ? (
        <FormControl variant="outlined">
          <InputLabel htmlFor={input.name}>{input.label}</InputLabel>
          <OutlinedInput
            id={input.name}
            type={showPassword ? "text" : "password"}
            name={input.name}
            value={values[input.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={input.label}
            error={!!errors[input.name]}
          />
          {console.log("danny", values)}
          {errors[input.name] && (
            <p className="text-red-500">{errors[input.name]}</p>
          )}
        </FormControl>
      ) : (
        <TextField
          fullWidth
          name={input.name}
          label={input.label}
          placeholder={input.placeholder}
          value={values[input.name]}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!errors[input.name]}
          helperText={errors[input.name]}
          variant="outlined"
        />
      )}
    </div>
  );
};

export default FormInput;
