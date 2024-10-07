import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  hobby: yup.string().required("Hobby is required"),
  otherHobby: yup.string().when("hobby", {
    is: "other",
    then: () => yup.string().required("Please specify your hobby."),
  }),
  gender: yup.string().required("Gender is required"),
  roles: yup.array().of(yup.string()).min(1, "At least one role is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().when("country", {
    is: (country) => !!country,
    then: () =>
      yup.string().required("City is required when a country is selected."),
  }),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10,13}$/, "Phone number must be 10 to 13 digits"),
  passWord: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .oneOf([yup.ref("confirmPassWord"), null], "Passwords must match"),
  confirmPassWord: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("passWord"), null], "Passwords must match"),
});

export const useUserForm = (
  initialValues = {
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
  }
) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...initialValues },
  });
  return methods;
};
