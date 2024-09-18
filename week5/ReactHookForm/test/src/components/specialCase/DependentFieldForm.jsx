import { useForm } from "react-hook-form";

const DependentFieldForm = () => {
  const { register, handleSubmit, watch } = useForm();
  const watchAge = watch("age", 0);

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("age")} placeholder="Age" />

      {watchAge >= 18 && (
        <div>
          <label>Driving License Number</label>
          <input {...register("licenseNumber")} placeholder="License Number" />
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default DependentFieldForm;
