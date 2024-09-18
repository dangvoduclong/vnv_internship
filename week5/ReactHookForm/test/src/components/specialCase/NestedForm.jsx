import { useForm } from "react-hook-form";

const NestedForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("user.firstName")} placeholder="First Name" />
      <input {...register("user.lastName")} placeholder="Last Name" />
      <input {...register("user.age")} placeholder="Age" />

      <button type="submit">Submit</button>
    </form>
  );
};

export default NestedForm;
