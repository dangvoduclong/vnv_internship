import { Button } from "@mui/material";

const ButtonField = ({ type, variant, color, onClick, children }) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      fullWidth
    >
      {children}
    </Button>
  );
};

export default ButtonField;
