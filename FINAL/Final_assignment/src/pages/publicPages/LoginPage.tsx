import React from "react";
import logo from "../../assets/images/logo.png";
import bg from "../../assets/images/bglg.jpg";
import { Box, Button, Link, Typography, Container } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import InputTextField from "../../components/form/InputTextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../../api/auth";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/,
        "Password must contain at least one letter, one number, and one special character."
      )
      .required(),
  })
  .required();

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login(data.username, data.password);
      toast.success("Login successful");
      console.log("Login response:", response);
      navigate("/account/admins");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed");
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            boxShadow: 3,
            borderRadius: 2,
            p: 3,
            width: "100%",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100%", maxWidth: "200px", marginBottom: "20px" }}
          />
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            CMS Login
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <Box marginBottom={2}>
                <InputTextField
                  name="username"
                  placeholder="Username or email"
                  type="text"
                  label="Username or email"
                />
              </Box>

              <Box marginBottom={2}>
                <InputTextField
                  name="password"
                  placeholder="Password"
                  type="password"
                  label="Password"
                />
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Link>Forgot Password?</Link>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ ml: 1 }}
                >
                  Login
                </Button>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
