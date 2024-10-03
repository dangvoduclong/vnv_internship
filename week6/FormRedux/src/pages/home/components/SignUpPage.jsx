import { Link, useNavigate } from "react-router-dom";
import UserForm from "../../../components/form/UserForm";
import toast from "react-hot-toast";
const SignUpPage = () => {
  const navigate = useNavigate();

  const onSubmit = (data) => {
    let storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
    if (storedUserData[data.email]) {
      toast.warning("Email already exists");
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
        roles: data.roles,
        passWord: data.passWord,
        confirmPassWord: data.confirmPassWord,
      };
      localStorage.setItem("userData", JSON.stringify(storedUserData));
      localStorage.setItem("isLoggedIn", "false");
      toast.success("Sign up successfully");
      navigate("/login");
    }
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

            <div className="mt-8">
              <UserForm onSubmit={onSubmit} />
            </div>
            <p className="mt-6 text-sm text-center text-gray-400">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-blue-500 focus:outline-none focus:underline hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
