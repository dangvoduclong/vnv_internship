import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import InputTextField from "../../../components/form/InputTextField";
import usePassVisibility from "../../../hooks/usePassVisibility";

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
  const { showPassword, handleClickShowPassword } = usePassVisibility();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      passWord: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
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
              <h2 className="text-4xl font-bold text-white">Loq</h2>
              <p className="max-w-xl mt-3 text-gray-300">
                The only limit to our realization of tomorrow will be our doubts
                of today.
              </p>
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
                  <InputTextField
                    name="email"
                    label="Email"
                    type="text"
                    control={control}
                    errors={errors}
                  />
                </div>
                <div>
                  <InputTextField
                    name="passWord"
                    label="Password"
                    type="password"
                    showPasswordToggle={showPassword}
                    onToggle={handleClickShowPassword}
                    control={control}
                    errors={errors}
                  />
                </div>
                <div className="my-2 text-right">
                  <a
                    href="#"
                    className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign in
                  </button>
                </div>
              </form>
              <p className="mt-6 text-sm text-center text-gray-400">
                Don't have an account yet?{" "}
                <Link
                  to={"/signup"}
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign up
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
