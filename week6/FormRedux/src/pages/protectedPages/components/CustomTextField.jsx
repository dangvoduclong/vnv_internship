import { TextField } from "@mui/material";

const CustomTextField = ({ label, value, onChange, ...props }) => {
  return (
    <TextField
      margin="dense"
      label={label}
      type="text"
      fullWidth
      variant="outlined"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default CustomTextField;
