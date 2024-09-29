import { useNavigate } from "react-router-dom";
import InputTextField from "../../../components/form/InputTextField";
import { MenuItem } from "@mui/material";
import SelectField from "../../../components/form/SelectField";
import RadioField from "../../../components/form/RadioField";
import CheckboxGroupField from "../../../components/form/CheckboxGroupField";
import dataCity from "../../../data/dataCity";
import usePassVisibility from "../../../hooks/usePassVisibility";
import ButtonField from "../../../components/form/ButtonField";
import { useFormContext } from "react-hook-form";

const SignUpPage = () => {
  const navigate = useNavigate();

  const { handleSubmit, reset, watch } = useFormContext();

  const {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
  } = usePassVisibility();

  const selectedCountry = watch("country");
  const cities = selectedCountry
    ? dataCity.find((item) => item.nameCountry === selectedCountry)?.cities
    : [];

  const selectedHobby = watch("hobby");

  const onSubmit = (data) => {
    console.log(data);

    let storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
    if (storedUserData[data.email]) {
      alert("Email already exist");
    } else {
      storedUserData[data.email] = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        hobby: data.hobby,
        otherHobby: data.otherHobby,
        country: data.country,
        city: data.city,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        roles: data.roles, // Hoặc bất kỳ thông tin nào khác bạn cần
        passWord: data.passWord,
        confirmPassWord: data.confirmPassWord,
      };
      localStorage.setItem("userData", JSON.stringify(storedUserData));
      localStorage.setItem("isLoggedIn", "false");
      alert("Sign up successfully");
      navigate("/login");
    }
  };

  const handleReset = () => {
    console.log("Reset button clicked");
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
                <InputTextField name="firstName" label="First Name" />
              </div>

              {/* Last Name */}
              <div>
                <InputTextField name="lastName" label="Last Name" />
              </div>

              {/* Phone Number */}
              <div>
                <InputTextField name="phoneNumber" label="Phone Number" />
              </div>

              {/* Email */}
              <div>
                <InputTextField name="email" label="Email" type="text" />
              </div>

              {/* Hobby */}
              <div>
                <SelectField name="hobby" label="Hobby">
                  <MenuItem value="reading">Reading</MenuItem>
                  <MenuItem value="music">Music</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </SelectField>

                {selectedHobby === "other" && (
                  <InputTextField
                    name="otherHobby"
                    label="Please specify your hobby"
                  />
                )}
              </div>

              {/* Country */}
              <div>
                <div className="mb-4">
                  <SelectField name="country" label="Country">
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
