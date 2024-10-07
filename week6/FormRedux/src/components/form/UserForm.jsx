import InputTextField from "../form/InputTextField";
import { MenuItem } from "@mui/material";
import SelectField from "../form/SelectField";
import RadioField from "../form/RadioField";
import CheckboxGroupField from "../form/CheckboxGroupField";
import dataCity from "../../data/dataCity";
import usePassVisibility from "../../hooks/usePassVisibility";
import ButtonField from "../form/ButtonField";
import { useSelector } from "react-redux";
import { useUserForm } from "../../hooks/useUserForm";
import { FormProvider } from "react-hook-form";

const UserForm = ({ onSubmit, initialValues }) => {
  const methods = useUserForm(initialValues);
  const { handleSubmit, reset, watch, setValue } = methods;

  const { userData } = useSelector((state) => state.user);

  const {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
  } = usePassVisibility();

  const selectedCountry = watch("country");

  const handleChangeCountry = (event) => {
    setValue("country", event.target.value);
    setValue("city", "");
  };

  const cities = selectedCountry
    ? dataCity.find((item) => item.nameCountry === selectedCountry)?.cities
    : [];

  const selectedHobby = watch("hobby");

  const handleChangeHobby = (event) => {
    setValue("hobby", event.target.value);
    setValue("otherHobby", "");
  };

  const handleReset = () => {
    reset({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      hobby: "",
      otherHobby: "",
      country: "",
      city: "",
      gender: "",
      roles: [],
      passWord: "",
      confirmPassWord: "",
    });
  };

  return (
    <FormProvider {...methods}>
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
          <InputTextField name="email" label="Email" />
        </div>

        {/* Hobby */}
        <div>
          <SelectField name="hobby" label="Hobby" onChange={handleChangeHobby}>
            <MenuItem value="reading">Reading</MenuItem>
            <MenuItem value="music">Music</MenuItem>
            <MenuItem value="sports">Sports</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </SelectField>

          <div className="mt-4">
            {selectedHobby === "other" && (
              <InputTextField
                name="otherHobby"
                label="Please specify your hobby"
              />
            )}
          </div>
        </div>

        {/* Country - City */}
        <div>
          <SelectField
            name="country"
            label="Country"
            onChange={handleChangeCountry}
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

          <div className="mt-4">
            <SelectField name="city" label="City" disabled={!selectedCountry}>
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
            //showPasswordToggle={showPassword}
            //onToggle={handleClickShowPassword}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <InputTextField
            name="confirmPassWord"
            label="Confirm Password"
            type="password"
            //showPasswordToggle={showConfirmPassword}
            //onToggle={handleClickShowConfirmPassword}
          />
        </div>

        {/* Button */}
        <ButtonField type="submit" variant="contained" color="primary">
          {userData?.email ? "UPDATE" : "SIGN UP"}
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
    </FormProvider>
  );
};

export default UserForm;
