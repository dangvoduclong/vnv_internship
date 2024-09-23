import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useUser } from "../context/User";
import dataCity from "../data/dataCity";

const schema = yup
  .object({
    firstName: yup.string().required(),
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

function SignUp() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState({ country: "", city: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setUserData } = useUser();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      hobby: "",
      gender: "",
      email: "",
      phoneNumber: "",
      passWord: "",
      confirmPassWord: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (city === "") {
      setMessage({ ...message, country: "Please select country" });
    }
    if (country === "") {
      setMessage({ ...message, city: "Please select city" });
    }
    if (country === "" || city === "") {
      return;
    }
    setUserData({
      ...data,
      country,
      city,
    });
    navigate("/login");
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
          <TextField
            {...register("hobby")}
            fullWidth
            select
            label="Hobby"
            variant="outlined"
            error={errors.hobby}
            helperText={errors.hobby?.message}
          >
            <MenuItem value="reading">Reading</MenuItem>
            <MenuItem value="music">Music</MenuItem>
            <MenuItem value="sports">Sports</MenuItem>
          </TextField>

          <div className="flex items-center">
            <span className="mr-2">Gender:</span>
            <RadioGroup>
              <FormControlLabel
                {...register("gender")}
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                {...register("gender")}
                value="male"
                control={<Radio />}
                label="Male"
              />
              <p className="text-red-500">{errors.gender?.message}</p>
            </RadioGroup>
          </div>
        </div>

        <div className="mb-4 flex space-x-4">
          <TextField
            onChange={(e) => {
              setCountry(e.target.value);
              setCity("");
              setMessage({ ...message, country: "" });
            }}
            fullWidth
            select
            error={!!message.country}
            helperText={message.country}
            label="Country"
            variant="outlined"
          >
            <MenuItem disabled value=""></MenuItem>
            {dataCity.map((item, index) => (
              <MenuItem key={index} value={index}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            onChange={(e) => {
              setCity(e.target.value);
              setMessage({ ...message, city: "" });
            }}
            fullWidth
            select
            error={!!message.city}
            helperText={message.city}
            label="City"
            variant="outlined"
            value={city}
          >
            <MenuItem disabled value=""></MenuItem>
            {country !== "" &&
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
