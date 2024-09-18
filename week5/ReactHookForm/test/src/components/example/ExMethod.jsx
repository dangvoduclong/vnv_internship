import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
const ExMethod = () => {
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState,
    setError,
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      country: "",
    },
  });
  const watchedFields = watch(["name", "email", "country"]);

  const onSubmit = (data) => {
    console.log("Form submitted: ", data);
  };
  const handleSetError = () => {
    setError("email", {
      type: "manual",
      message: "Email is not valid",
    });
  };
  const handleReset = () => {
    reset({
      name: "",
      email: "",
      country: "",
    });
  };

  const handleTrigger = async () => {
    const result = await trigger();
    console.log("Validation result: ", result);
  };
  const handleGetValues = () => {
    console.log("Current Values:", getValues());
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth margin="none">
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              error={!!formState.errors.name}
              helperText={formState.errors.name?.message}
            />
          )}
        />
      </FormControl>

      <FormControl fullWidth margin="none">
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              error={!!formState.errors.email}
              helperText={formState.errors.email?.message}
            />
          )}
        />
      </FormControl>
      <br />
      <br />

      <FormControl style={{ width: "120px" }} variant="outlined" margin="none">
        <InputLabel>Country</InputLabel>
        <Controller
          name="country"
          control={control}
          rules={{ required: "Country is required" }}
          render={({ field }) => (
            <Select
              {...field}
              label="Country"
              error={!!formState.errors.country}
            >
              <MenuItem value="" disabled>
                Select your country
              </MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="UK">UK</MenuItem>
            </Select>
          )}
        />
        {formState.errors.country && (
          <FormHelperText error>
            {formState.errors.country.message}
          </FormHelperText>
        )}
      </FormControl>

      <Button type="button" onClick={handleSetError}>
        Set Email Error
      </Button>
      <Button type="button" onClick={handleReset}>
        Reset Form
      </Button>
      <Button type="button" onClick={handleTrigger}>
        Trigger Validation
      </Button>
      <Button type="submit">Submit</Button>
      <Button type="button" onClick={handleGetValues}>
        Get Current Values
      </Button>

      <div>
        <h3>Watched Fields</h3>
        <pre>{JSON.stringify(watchedFields, null, 2)}</pre>
      </div>
    </form>
  );
};

export default ExMethod;
