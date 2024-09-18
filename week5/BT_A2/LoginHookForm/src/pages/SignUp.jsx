import { useEffect, useState } from "react";
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

const schema = yup
  .object({
    firstName: yup.string().required("Tieng viet"),
    lastName: yup.string().required(),
    hobby: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().required(),
    phoneNumber: yup.number().positive().integer().required(),
    passWord: yup.string().required(),
    comfirmPassWord: yup.string().required(),
  })
  .required();
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("data"));
    if (getData) {
      navigate("/dashboard");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate(); // ham chuyen trang
  const onSubmit = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
    navigate("/dashboard");
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
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
            {...register("comfirmPassWord")}
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
            error={errors.comfirmPassWord}
            helperText={errors.comfirmPassWord?.message}
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
      </form>
    </div>
  );
}

export default SignUp;
