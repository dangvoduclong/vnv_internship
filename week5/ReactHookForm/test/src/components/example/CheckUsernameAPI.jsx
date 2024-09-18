import { useForm } from "react-hook-form";

const CheckUsernameAPI = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const checkUsername = async (username) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      const usernameExists = data.some(
        (user) => user.username.toLowerCase() === username.toLowerCase()
      );
      return usernameExists ? "Username already exists" : true;
    } catch (error) {
      console.error("Fetch error: ", error);
      return "An error occurred while checking username.";
    }
  };
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", {
            required: true,
            validate: checkUsername,
          })}
          placeholder="Username"
        />
        {errors.username && <p>{errors.username.message}</p>}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CheckUsernameAPI;
