import { useForm } from "react-hook-form";
const ExFormState = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitted,
      submitCount,
    },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      age: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className={`border p-2 w-full ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Age</label>
          <input
            type="number"
            {...register("age", { required: "Age is required" })}
            className={`border p-2 w-full ${
              errors.age ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        <div className="mt-4">
          {console.log(isDirty)}
          {isDirty && <div>You have unsaved changes!</div>}
          {isSubmitted && (
            <div className="text-green-500">
              Form submitted successfully! Submit Count: {submitCount}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExFormState;
