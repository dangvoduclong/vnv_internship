import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputTextField from "../../../components/form/InputTextField";
import { MenuItem } from "@mui/material";
import SelectField from "../../../components/form/SelectField";
import RadioField from "../../../components/form/RadioField";
import CheckboxGroupField from "../../../components/form/CheckboxGroupField";
import dataCity from "../../../data/dataCity";
import usePassVisibility from "../../../hooks/usePassVisibility";
import ButtonField from "../../../components/form/ButtonField";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    hobby: yup.string().required(),
    otherHobby: yup.string().when("hobby", {
      is: "other",
      then: () => yup.string().required("Please specify your hobby."),
      otherwise: () => yup.string().nullable(),
    }),
    gender: yup.string().required(),
    roles: yup.array().of(yup.string()).min(1, "At least one role is required"),
    country: yup.string().required(),
    city: yup.string().when("country", {
      is: (country) => country && country.length > 0,
      then: () =>
        yup.string().required("City is required when a country is selected."),
      otherwise: () => yup.string().nullable(),
    }),
    email: yup.string().email("Invalid email format").required(),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10,13}$/, "Phone number must be 10 to 13 digits")
      .required(),
    passWord: yup
      .string()
      .min(5, "Password must be at least 5 characters")
      .required(),
    confirmPassWord: yup
      .string()
      .oneOf([yup.ref("passWord"), null], "Passwords must match")
      .required(),
  })
  .required();

const SignUpPage = () => {
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
    watch,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      hobby: "",
      otherHobby: "",
      country: "",
      roles: [],
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

  const selectedHobby = watch("hobby");

  const onSubmit = (data) => {
    console.log(data);
    navigate("/login");
  };

  const handleReset = () => {
    reset();
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80")',
          }}
        ></div>
        <div className="flex items-center w-full max-w-3xl p-6 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Get your free account now.
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
            >
              {/* First Name */}
              <div>
                <InputTextField
                  name="firstName"
                  label="First Name"
                  control={control}
                  errors={errors}
                />
              </div>

              {/* Last Name */}
              <div>
                <InputTextField
                  name="lastName"
                  label="Last Name"
                  control={control}
                  errors={errors}
                />
              </div>

              {/* Phone Number */}
              <div>
                <InputTextField
                  name="phoneNumber"
                  label="Phone Number"
                  control={control}
                  errors={errors}
                />
              </div>

              {/* Email */}
              <div>
                <InputTextField
                  name="email"
                  label="Email"
                  type="text"
                  control={control}
                  errors={errors}
                />
              </div>

              {/* Hobby */}
              <div>
                <SelectField
                  name="hobby"
                  label="Hobby"
                  control={control}
                  errors={errors}
                >
                  <MenuItem value="reading">Reading</MenuItem>
                  <MenuItem value="music">Music</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </SelectField>

                {selectedHobby === "other" && (
                  <InputTextField
                    name="otherHobby"
                    label="Please specify your hobby"
                    control={control}
                    errors={errors}
                  />
                )}
              </div>

              {/* Country */}
              <div>
                <div>
                  <SelectField
                    name="country"
                    label="Country"
                    control={control}
                    errors={errors}
                  >
                    <MenuItem disabled value="">
                      <em>Select a country</em>
                    </MenuItem>
                    {dataCity.map((item, index) => (
                      <MenuItem key={index} value={item.nameCountry}>
                        {item.nameCountry}
                      </MenuItem>
                    ))}
                  </SelectField>
                </div>

                {/* City */}
                <div>
                  <SelectField
                    name="city"
                    label="City"
                    control={control}
                    errors={errors}
                    disabled={!selectedCountry}
                  >
                    <MenuItem disabled value="">
                      <em>Select a city</em>
                    </MenuItem>
                    {cities.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </SelectField>
                </div>
              </div>

              {/* Role */}
              <div>
                <CheckboxGroupField
                  name="roles"
                  label="Role"
                  control={control}
                  errors={errors}
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "user", label: "User" },
                    { value: "customer", label: "Customer" },
                  ]}
                />
              </div>

              {/* Gender */}
              <div>
                <RadioField
                  name="gender"
                  label="Gender"
                  control={control}
                  errors={errors}
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                />
              </div>

              {/* Password */}
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

              {/* Confirm Password */}
              <div>
                <InputTextField
                  name="confirmPassWord"
                  label="Confirm Password"
                  type="password"
                  showPasswordToggle={showConfirmPassword}
                  onToggle={handleClickShowConfirmPassword}
                  control={control}
                  errors={errors}
                />
              </div>

              {/* Button */}
              <ButtonField type="submit" variant="contained" color="primary">
                SIGN UP
              </ButtonField>
              <ButtonField
                type="button"
                variant="outlined"
                color="success"
                onClick={handleReset}
              >
                RESET
              </ButtonField>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
