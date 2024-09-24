import { Button, TextField, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";

const AddPhoneNum = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumbers: [{ number: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const onSubmit = (data) => {
    if (data.length === 0) return;
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
      <Typography variant="h4">Danh sách Số điện thoại</Typography>
      {fields.map((item, index) => (
        <div key={item.id} className="flex items-center mb-4">
          <div className="mr-4 w-full">
            <TextField
              {...register(`phoneNumbers.${index}.number`, {
                required: "Số điện thoại là bắt buộc",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Số điện thoại phải gồm 10 chữ số",
                },
              })}
              fullWidth
              label={`Số điện thoại ${index + 1}`}
              variant="outlined"
              error={!!errors.phoneNumbers?.[index]?.number}
              helperText={errors.phoneNumbers?.[index]?.number?.message}
            />
          </div>
          <Button
            variant="outlined"
            color="error"
            onClick={() => remove(index)}
            className="hover:bg-red-600 hover:text-white"
          >
            Xóa
          </Button>
        </div>
      ))}
      <div className="flex gap-4">
        <Button
          variant="contained"
          onClick={() => append({ number: "" })}
          className="bg-green-400 hover:bg-green-500"
        >
          Thêm Số điện thoại
        </Button>
        <Button
          type="submit"
          variant="contained"
          className="bg-green-400 hover:bg-green-500"
        >
          Gửi
        </Button>
      </div>
    </form>
  );
};

export default AddPhoneNum;
