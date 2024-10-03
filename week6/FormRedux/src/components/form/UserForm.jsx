import InputTextField from "../form/InputTextField";
import { MenuItem } from "@mui/material";
import SelectField from "../form/SelectField";
import RadioField from "../form/RadioField";
import CheckboxGroupField from "../form/CheckboxGroupField";
import dataCity from "../../data/dataCity";
import usePassVisibility from "../../hooks/usePassVisibility";
import ButtonField from "../form/ButtonField";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

const UserForm = ({ onSubmit }) => {
  const { handleSubmit, reset, watch } = useFormContext();
  const userData = useSelector((state) => state.user.userData);

  const {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
  } = usePassVisibility();

  const selectedCountry = watch("country");
  console.log(watch("country"));

  const cities = selectedCountry
    ? dataCity.find((item) => item.nameCountry === selectedCountry)?.cities
    : [];

  const selectedHobby = watch("hobby");
  console.log(selectedHobby);

  const handleReset = () => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
    >
      {/* First Name */}
      <div>
        <InputTextField
          name="firstName"
          label="First Name"
          defaultValue={userData?.firstName}
        />
      </div>

      {/* Last Name */}
      <div>
        <InputTextField
          name="lastName"
          label="Last Name"
          defaultValue={userData?.lastName}
        />
      </div>

      {/* Phone Number */}
      <div>
        <InputTextField
          name="phoneNumber"
          label="Phone Number"
          defaultValue={userData?.phoneNumber}
        />
      </div>

      {/* Email */}
      <div>
        <InputTextField
          name="email"
          label="Email"
          type="text"
          defaultValue={userData?.email}
        />
      </div>

      {/* Hobby */}
      <div>
        <SelectField name="hobby" label="Hobby" defaultValue={userData?.hobby}>
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
              defaultValue={userData?.otherHobby}
            />
          )}
        </div>
      </div>

      {/* Country */}
      <div>
        <SelectField
          name="country"
          label="Country"
          defaultValue={userData?.country}
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

        {/* City */}
        <div className="mt-4">
          <SelectField
            name="city"
            label="City"
            disabled={!selectedCountry}
            defaultValue={userData?.city}
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
          defaultValue={userData?.roles}
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
          defaultValue={userData?.gender}
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
        {userData ? "UPDATE" : "SIGN UP"}
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
  );
};

export default UserForm;
