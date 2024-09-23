import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useUser } from "../context/User";
import dataCity from "../data/dataCity";

const schema = yup
  .object({
    firstName: yup.string().required(""),
    lastName: yup.string().required(),
    hobby: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().required(),
    phoneNumber: yup.number().positive().integer().required(),
    passWord: yup.string().required(),
    confirmPassWord: yup
      .string()
      .oneOf([yup.ref("passWord"), null], "Passwords must match")
      .required(),
  })
  .required();

const DashBoard = () => {
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const { userData: data, setUserData } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    setCountry(data?.country);
    setCity(data?.city);
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      hobby: data?.hobby,
      gender: data?.gender,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      passWord: data?.passWord,
      confirmPassWord: data?.confirmPassWord,
    },
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setUserData({
      ...data,
      country,
      city,
    });

    alert("Your information has been updated.");
    navigate("/personalInformation");
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-md w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl "
      >
        <h1 className="text-2xl font-bold mb-6">Update</h1>
        <div className="mb-4">
          <TextField
            {...register("firstName")}
            fullWidth
            label="First Name"
            variant="outlined"
            error={errors.firstName}
            helperText={errors.firstName?.message}
          />
        </div>

        <div className="mb-4">
          <TextField
            {...register("lastName")}
            fullWidth
            label="Last Name"
            variant="outlined"
            error={errors.lastName}
            helperText={errors.lastName?.message}
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <label htmlFor="">Hobby:</label>
          <select className="mb-4" {...register("hobby")}>
            <option value="music">Music</option>
            <option value="reading">Reading</option>
            <option value="sports">Sports</option>
          </select>
          <p className="text-red-500">{errors.hobby?.message}</p>

          <div className="mb-4 flex space-x-4">
            <span className="mr-2">Gender:</span>
            <label htmlFor="male">male</label>
            <input
              className="ml-2"
              type="radio"
              {...register("gender")}
              value="male"
            />
            <label className="ml-2" htmlFor="female">
              female
            </label>

            <input
              className="ml-2"
              type="radio"
              {...register("gender")}
              value="female"
            />
          </div>
        </div>

        {/* <div className="mb-4 flex space-x-4">
          <label htmlFor="">Country:</label>
          <select
            className="mb-4"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          >
            {dataCity.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>

          <div className="mb-4 flex space-x-4">
            <label className="mr-2">Cities:</label>
            <select
              className="mb-4"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            >
              {country !== null &&
                dataCity[country].cities.map((item, index) => (
                  <option key={index} value={index}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div> */}

        <div className="mb-4">
          <TextField
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            fullWidth
            select
            variant="outlined"
          >
            {dataCity.map((item, index) => (
              <MenuItem key={index} value={index}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="mb-4">
          <TextField
            onChange={(e) => setCity(e.target.value)}
            value={city}
            fullWidth
            select
            variant="outlined"
          >
            {country !== null &&
              dataCity[country].cities.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {item}
                </MenuItem>
              ))}
          </TextField>
        </div>

        <div className="mb-4">
          <TextField
            {...register("email")}
            fullWidth
            label="Email"
            variant="outlined"
            error={errors.email}
            helperText={errors.email?.message}
          />
        </div>

        <div className="mb-4">
          <TextField
            {...register("phoneNumber")}
            fullWidth
            label="Phone Number"
            variant="outlined"
            error={errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        </div>

        <div className="mb-4">
          <TextField
            {...register("passWord")}
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errors.passWord}
            helperText={errors.passWord?.message}
          />
        </div>

        <div className="mb-6">
          <TextField
            {...register("confirmPassWord")}
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errors.confirmPassWord}
            helperText={errors.confirmPassWord?.message}
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="bg-blue-500 hover:bg-blue-600"
        >
          UPDATE
        </Button>
      </form>
    </div>
  );
};

export default DashBoard;
