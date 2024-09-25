import React, { createContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FormContext = createContext();

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  hobby: yup.string().required("Hobby is required"),
  otherHobby: yup.string().when("hobby", {
    is: "other",
    then: yup.string().required("Please specify your hobby."),
  }),
  gender: yup.string().required("Gender is required"),
  roles: yup.array().of(yup.string()).min(1, "At least one role is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().when("country", {
    is: (country) => !!country,
    then: yup.string().required("City is required when a country is selected."),
  }),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10,13}$/, "Phone number must be 10 to 13 digits")
    .required("Phone number is required"),
  passWord: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  confirmPassWord: yup
    .string()
    .oneOf([yup.ref("passWord"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const FormProvider = ({ children }) => {
  const methods = useForm({
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

  return (
    <FormContext.Provider value={methods}>{children}</FormContext.Provider>
  );
};

export const useFormContext = () => React.useContext(FormContext);
