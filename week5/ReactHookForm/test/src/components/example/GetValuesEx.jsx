import { useForm } from "react-hook-form";
const GetValuesEx = () => {
  const { register, getValues } = useForm();

  const showValues = () => {
    console.log(getValues());
  };

  return (
    <div>
      <form>
        <input {...register("firstName")} />
        <input {...register("lastName")} />
      </form>
      <button type="button" onClick={showValues}>
        Show Values
      </button>
    </div>
  );
};

export default GetValuesEx;
