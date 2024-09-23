import { useForm, useFormState, useWatch } from "react-hook-form";
import CheckUsernameAPI from "./components/example/CheckUsernameAPI";
import DynamicForm from "./components/example/DynamicForm";
import Example from "./components/example/Example";
import ExFormState from "./components/example/ExFormState";
import ExMethod from "./components/example/ExMethod";
import ExTrigger from "./components/example/ExTrigger";
import ExValidate1 from "./components/example/ExValidate1";
import GetValuesEx from "./components/example/GetValuesEx";
import UseControllerEx from "./components/example/UseControllerEx";
import DependentFieldForm from "./components/specialCase/DependentFieldForm";
import DynamicFieldsForm from "./components/specialCase/DynamicFieldsForm";
import MUIForm from "./components/specialCase/MUIForm";
import NestedForm from "./components/specialCase/NestedForm";

function App() {
  const { control, handleSubmit } = useForm();
  const watchedValues = useWatch({ control });
  const { isSubmitting, isDirty } = useFormState({ control });
  return (
    <>
      <DynamicForm control={control} handleSubmit={handleSubmit} />
      <h2>Watched Values:</h2>
      <pre>{JSON.stringify(watchedValues, null, 2)}</pre>
      <div>Submitting: {isSubmitting ? "Yes" : "No"}</div>
      <div>Dirty: {isDirty ? "Yes" : "No"}</div>
      {/* <h1>Example</h1>
      <Example />
      <hr />
      
      <h1>CheckUsernameAPI</h1>
      <CheckUsernameAPI />
      <hr />

      <h1>DynamicFieldsForm</h1>
      <DynamicFieldsForm />
      <hr />

      <h1>NestedForm</h1>
      <NestedForm />
      <hr />

      <h1>DependentFieldForm</h1>
      <DependentFieldForm />
      <hr />

      <h1>MUI Form</h1>
      <MUIForm />
      <hr />

      <h1>getValues</h1>
      <GetValuesEx />
      <hr />

      <h1>useController</h1>
      <hr />
      
      <h1>Method</h1>
      <hr /> 
      
      <ExMethod />
      
      <ExTrigger />
      <ExFormState />
      
      <ExValidate1 />
      */}
      <UseControllerEx />
    </>
  );
}

export default App;
