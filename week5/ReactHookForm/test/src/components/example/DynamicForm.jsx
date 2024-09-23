import { useFieldArray, useController } from "react-hook-form";

const UserInput = ({ control, index }) => {
  const { field: nameField } = useController({
    name: `users.${index}.name`,
    control,
  });
  const { field: emailField } = useController({
    name: `users.${index}.email`,
    control,
  });

  return (
    <div>
      <input {...nameField} placeholder="Name" />
      <input {...emailField} placeholder="Email" />
    </div>
  );
};

const DynamicForm = ({ control, handleSubmit }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });

  const onSubmit = (data) => {
    console.log("Submitting data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>User Form</h1>
      {fields.map((field, index) => (
        <div key={field.id}>
          <UserInput control={control} index={index} />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "", email: "" })}>
        Add User
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
