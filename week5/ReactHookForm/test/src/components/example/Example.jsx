import { useForm } from "react-hook-form";

const Example = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "Vinh",
      lastName: "Nguyen",
      email: "vOqK5@example.com",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("firstName", { required: true, maxLength: 10 })}
          placeholder="First Name"
        />
        {errors.firstName && <p>First name is required</p>}
        <input
          {...register("lastName", { required: true, maxLength: 10 })}
          placeholder="Last Name"
        />
        {errors.lastName && <p>Last name is required</p>}
        <input
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
          placeholder="Email"
        />
        {errors.email && <p>Email is not valid</p>}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Example;
