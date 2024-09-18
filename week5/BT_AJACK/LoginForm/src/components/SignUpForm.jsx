import { useState } from "react";
import FormInput from "./FormInput";

const SignUpForm = () => {
  const inputs = [
    {
      id: 1,
      name: "firstname",
      type: "text",
      placeholder: "First name",
      errorMessage: "Firstname is required",
      label: "Firstname",
      required: true,
    },
    {
      id: 2,
      name: "lastname",
      type: "text",
      placeholder: "Last name",
      errorMessage: "Lastname is required",
      label: "Lastname",
      required: true,
    },
    {
      id: 3,
      name: "hobby",
      type: "text",
      placeholder: "Hobby",
      errorMessage: "Hobby is required",
      label: "Hobby",
      required: true,
    },
    {
      id: 4,
      name: "gender",
      type: "radio",
      errorMessage: "Gender is required",
      label: "Gender",
      required: true,
    },
    {
      id: 5,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 6,
      name: "phonenumber",
      type: "number",
      placeholder: "Phone Number",
      errorMessage: "Phone Number is required",
      label: "Phone Number",
      required: true,
    },
    {
      id: 7,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Please enter password",
      label: "Password",
      required: true,
    },
    {
      id: 8,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Please confirm password",
      label: "Confirm Password",
      required: true,
    },
  ];

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    hobby: "",
    gender: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    if (!values[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: inputs.find((i) => i.name === e.target.name)
          .errorMessage,
      });
    } else {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};

    inputs.forEach((input) => {
      if (!values[input.name]) {
        newError[input.name] = input.errorMessage;
      }
    });
    setErrors(newError);

    if (Object.keys(newError).length === 0) {
      console.log(values);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Login Form</h1>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          input={input}
          values={values}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors}
        />
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white w-full py-2 px-4 rounded mt-4 hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
