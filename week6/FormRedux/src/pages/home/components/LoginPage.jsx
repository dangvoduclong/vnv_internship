import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import usePassVisibility from "../../../hooks/usePassVisibility";
import ButtonField from "../../../components/form/ButtonField";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../redux/slice/userSlice";
import toast from "react-hot-toast";
import InputTextField from "../../../components/form/InputTextField";

const schema = yup
  .object({
    email: yup.string().email("Invalid email format").required(),
    passWord: yup
      .string()
      .min(5, "Password must be at least 5 characters")
      .required(),
  })
  .required();

const LoginPage = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showPassword, handleClickShowPassword } = usePassVisibility();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      passWord: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const onSubmit = (data) => {
    const result = login(data.email, data.passWord);
    if (result.success) {
      dispatch(
        setUserData(JSON.parse(localStorage.getItem("userData"))[data.email])
      );
      toast.success("Login successfully");
      navigate("/dashboard");
    } else {
      toast.error(result.message);
    }
  };
  return (
    <FormProvider {...methods}>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">Coca-Cola</h2>
                <p className="max-w-xl mt-3 text-gray-300">Taste the Feeling</p>

                <Link to={"/"}>
                  <span className="mt-6 ml-2 inline-block bg-purple-300 text-white font-semibold py-2 px-4 rounded hover:bg-purple-600 transition duration-200">
                    Come back Home
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                  WELCOME
                </h2>
                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  Sign in to access your account
                </p>
              </div>
              <div className="mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        />
                      )}
                    />
                  </div>
                  <div>
                    {/* <Controller
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
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={!!errors.passWord}
                        helperText={errors.passWord?.message}
                        className="border rounded-md"
                      />
                    )}
                  /> */}
                    <InputTextField
                      name="passWord"
                      control={control}
                      label="Password"
                      type="password"
                      //showPasswordToggle={showPassword}
                      //onToggle={handleClickShowPassword}
                    />
                  </div>
                  <div className="my-2 text-right">
                    <a
                      onClick={() => {
                        alert("I don't know how to do it");
                      }}
                      href="#"
                      className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="mt-6">
                    <ButtonField
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      SIGN IN
                    </ButtonField>
                  </div>
                </form>
                <p className="mt-6 text-sm text-center text-gray-400">
                  Do not have an account yet?{" "}
                  <Link
                    to={"/signup"}
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default LoginPage;
