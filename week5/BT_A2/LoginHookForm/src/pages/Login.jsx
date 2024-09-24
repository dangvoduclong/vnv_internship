import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
const schema = yup
  .object({
    email: yup.string().required(),
    passWord: yup.string().required(),
  })
  .required();
const LoginPage = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    if (data.email === userData.email && data.passWord === userData.passWord)
      navigate("/dashboard");
    else {
      return;
    }
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
          <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <label
              htmlFor
              className="block mt-3 text-sm text-gray-700 text-center font-semibold"
            >
              Login
            </label>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
              <div>
                <TextField
                  {...register("email")}
                  fullWidth
                  label="Email"
                  variant="outlined"
                  error={errors.email}
                  helperText={errors.email?.message}
                />
              </div>
              <div className="mt-7">
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

              <div className="mt-7">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  LOGIN
                </Button>
              </div>
              <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                Do not have an account?
                <Link
                  to="/signup"
                  href="#signup"
                  className="ml-1 block font-sans text-sm font-bold leading-normal text-pink-500 antialiased"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
