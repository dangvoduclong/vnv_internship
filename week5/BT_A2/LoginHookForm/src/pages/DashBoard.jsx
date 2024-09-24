import { useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import dataCity from "../data/dataCity";
import InputField from "../components/form/InputField";
import usePassVisibility from "../hooks/usePassVisibility";

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    hobby: yup.string().required("Hobby is required"),
    gender: yup.string().required("Gender is required"),
    email: yup.string().required("Email is required"),
    phoneNumber: yup
      .number()
      .positive()
      .integer()
      .required("Phone number is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    passWord: yup.string().required("Password is required"),
    confirmPassWord: yup
      .string()
      .oneOf([yup.ref("passWord"), null], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required();

const DashBoard = () => {
  const { userData: data, login } = useAuth();
  const navigate = useNavigate();
  const {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
  } = usePassVisibility();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      hobby: data?.hobby || "",
      gender: data?.gender || "",
      country: data?.country || "",
      city: data?.city || "",
      email: data?.email || "",
      phoneNumber: data?.phoneNumber || "",
      passWord: data?.passWord || "",
      confirmPassWord: data?.confirmPassWord || "",
    },
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const onSubmit = (formData) => {
    login(formData);
    alert("Your information has been updated.");
    navigate("/personalInformation");
  };

  const country = watch("country");
  useEffect(() => {
    const selectedCountry = data?.country;

    if (country && country !== selectedCountry) {
      const selectedCity =
        dataCity.find((item) => item.nameCountry === country)?.cities[0] || "";
      setValue("city", selectedCity);
    }
  }, [country, setValue]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Update Information
        </h1>

        {/* First Name */}
        <div className="mb-4">
          <InputField
            name="firstName"
            control={control}
            errors={errors}
            label="First Name"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <InputField
            name="lastName"
            control={control}
            errors={errors}
            label="Last Name"
          />
        </div>

        {/* Hobby */}
        <div className="mb-4 flex space-x-4">
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="hobby-label">Hobby</InputLabel>
            <Controller
              name="hobby"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="hobby-label"
                  label="Hobby"
                  className="border rounded-md shadow-sm"
                >
                  <MenuItem value="music">Music</MenuItem>
                  <MenuItem value="reading">Reading</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          {/* Gender */}
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">Gender:</span>
            <Controller
              name="gender"
              control={control}
              defaultValue="male"
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
          </div>
        </div>

        {/* Country */}
        <div className="mb-4">
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="country-label">Country</InputLabel>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="country-label"
                  label="Country"
                  className="border rounded-md shadow-sm"
                >
                  {dataCity.map((item, index) => (
                    <MenuItem key={index} value={item.nameCountry}>
                      {item.nameCountry}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </div>

        {/* City */}
        <div className="mb-4">
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="city-label">City</InputLabel>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="city-label"
                  label="City"
                  disabled={!country}
                  className="border rounded-md shadow-sm"
                >
                  {country &&
                    dataCity
                      .find((item) => item.nameCountry === country)
                      ?.cities.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                </Select>
              )}
            />
          </FormControl>
        </div>

        {/* Email */}
        <div className="mb-4">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                className="border rounded-md"
              />
            )}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone Number"
                variant="outlined"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                className="border rounded-md"
              />
            )}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <Controller
            name="passWord"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.passWord}
                helperText={errors.passWord?.message}
                className="border rounded-md"
              />
            )}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <Controller
            name="confirmPassWord"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Confirm Password"
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowConfirmPassword}>
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.confirmPassWord}
                helperText={errors.confirmPassWord?.message}
                className="border rounded-md"
              />
            )}
          />
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2"
        >
          UPDATE
        </Button>
      </form>
    </div>
  );
};

export default DashBoard;
