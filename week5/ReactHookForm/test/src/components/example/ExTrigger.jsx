import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
const ExTrigger = () => {
  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleReset = async () => {
    await reset({
      email: "", // Đặt lại trường email về chuỗi rỗng
    });
    await trigger("email"); // Gọi trigger để kiểm tra lại xác thực
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Email is not valid",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            onBlur={() => trigger("email")}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
        )}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
      <Button type="button" variant="outlined" onClick={handleReset}>
        Reset
      </Button>
    </form>
  );
};

export default ExTrigger;
