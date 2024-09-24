import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import dataCity from "../data/dataCity";
import InputField from "../components/form/InputField";
import usePassVisibility from "../hooks/usePassVisibility";
import PassInputProps from "../components/form/PassInputProps";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    hobby: yup.string().required(),
    gender: yup.string().required(),
    country: yup.string().required(),
    city: yup.string().required(),
    email: yup.string().required(),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must be digits")
      .required(),
    passWord: yup.string().required(),
    confirmPassWord: yup
      .string()
      .oneOf([yup.ref("passWord"), null], "Passwords must match")
      .required(),
  })
  .required();

function SignUp() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
  } = usePassVisibility();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      hobby: "",
      country: "",
      city: "",
      gender: "",
      email: "",
      phoneNumber: "",
      passWord: "",
      confirmPassWord: "",
    },
  });

  const selectedCountry = watch("country");
  const cities = selectedCountry
    ? dataCity.find((item) => item.nameCountry === selectedCountry)?.cities
    : [];

  const onSubmit = (data) => {
    login(data);
    navigate("/dashboard");
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md "
      >
        <h1 className="text-2xl font-bold mb-6">Sign up</h1>

        {/* First Name */}
        <div className="mb-4">
          <InputField
            name="firstName"
            label="First Name"
            control={control}
            errors={errors}
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <InputField
            name="lastName"
            label="Last Name"
            control={control}
            errors={errors}
          />
        </div>

        {/* Hobby and Gender */}
        <div className="mb-4 flex space-x-4">
          <InputField
            name="hobby"
            label="Hobby"
            select
            control={control}
            errors={errors}
          >
            <MenuItem value="reading">Reading</MenuItem>
            <MenuItem value="music">Music</MenuItem>
            <MenuItem value="sports">Sports</MenuItem>
          </InputField>

          <div className="flex items-center">
            <FormControl error={!!errors.gender} className="flex items-center">
              <FormLabel>Gender</FormLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                )}
              />
              <FormHelperText>{errors.gender?.message}</FormHelperText>
            </FormControl>
          </div>
        </div>

        {/* Country */}
        <div className="mb-4 flex space-x-4">
          <FormControl fullWidth error={!!errors.country}>
            <FormLabel>Country</FormLabel>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select {...field} displayEmpty>
                  <MenuItem disabled value="">
                    <em>Select a country</em>
                  </MenuItem>
                  {dataCity.map((item, index) => (
                    <MenuItem key={index} value={item.nameCountry}>
                      {item.nameCountry}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.country?.message}</FormHelperText>
          </FormControl>

          {/* City */}
          <FormControl
            fullWidth
            error={!!errors.city}
            disabled={!selectedCountry}
          >
            <FormLabel>City</FormLabel>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Select {...field} displayEmpty>
                  <MenuItem disabled value="">
                    <em>Select a city</em>
                  </MenuItem>
                  {cities.map((city, index) => (
                    <MenuItem key={index} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.city?.message}</FormHelperText>
          </FormControl>
        </div>

        {/* Email */}
        <div className="mb-4">
          <InputField
            name="email"
            label="Email"
            control={control}
            errors={errors}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <InputField
            name="phoneNumber"
            label="Phone Number"
            control={control}
            errors={errors}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <InputField
            name="passWord"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={PassInputProps({
              isVisible: showPassword,
              onToggle: handleClickShowPassword,
            })}
            control={control}
            errors={errors}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <InputField
            name="confirmPassWord"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            InputProps={PassInputProps({
              isVisible: showConfirmPassword,
              onToggle: handleClickShowConfirmPassword,
            })}
            control={control}
            errors={errors}
          />
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="bg-blue-500 hover:bg-blue-600"
        >
          SIGN UP
        </Button>
        <br />
        <br />
        <Button
          type="button"
          fullWidth
          variant="outlined"
          color="primary"
          onClick={handleReset}
        >
          RESET
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
