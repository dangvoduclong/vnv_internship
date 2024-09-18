import { useForm, useController } from "react-hook-form";
import { TextField } from "@mui/material";
const UseControllerEx = () => {
  const { control } = useForm();
  const {
    field,
    fieldState: { error },
  } = useController({
    name: "firstName",
    control,
    rules: { required: "First name is required" },
  });

  return (
    <div>
      <TextField
        label="First Name"
        variant="outlined"
        {...field}
        error={!!error}
        helperText={error ? error.message : ""}
      />
    </div>
  );
};

export default UseControllerEx;
