import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Checkbox,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
} from "@mui/material";

const MUIForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        rules={{ required: "First name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            variant="outlined"
            fullWidth
            margin="none"
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ""}
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        rules={{ required: "Last name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="none"
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message : ""}
          />
        )}
      />

      <Controller
        name="gender"
        control={control}
        defaultValue=""
        rules={{ required: "Gender is required" }}
        render={({ field }) => (
          <RadioGroup {...field} row>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        )}
      />
      {errors.gender && <p style={{ color: "red" }}>{errors.gender.message}</p>}

      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email address",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            fullWidth
            margin="none"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
        )}
      />
      <Controller
        name="country"
        control={control}
        defaultValue=""
        rules={{ required: "Country is required" }}
        render={({ field }) => (
          <FormControl>
            <InputLabel>Country</InputLabel>
            <Select
              {...field}
              label="Country"
              fullWidth
              variant="outlined"
              displayEmpty
              margin="none"
              error={!!errors.country}
              style={{ width: "120px" }}
            >
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="UK">UK</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      {errors.country && (
        <p style={{ color: "red" }}>{errors.country.message}</p>
      )}
      <br />

      <Controller
        name="subscribe"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            control={<Switch {...field} checked={field.value} />}
            label="Subscribe to Newsletter"
          />
        )}
      />

      <Controller
        name="terms"
        control={control}
        defaultValue={false}
        rules={{ required: "You must accept the terms" }}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="I accept the terms and conditions"
          />
        )}
      />
      {errors.terms && <p style={{ color: "red" }}>{errors.terms.message}</p>}

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default MUIForm;
