import { useForm, useFieldArray } from "react-hook-form";

const DynamicFieldsForm = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      items: [{ name: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => (
        <div key={item.id}>
          <input {...register(`items.${index}.name`)} placeholder="Item Name" />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "" })}>
        Add Item
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicFieldsForm;
