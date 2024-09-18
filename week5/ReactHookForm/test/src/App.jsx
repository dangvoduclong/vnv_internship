import CheckUsernameAPI from "./components/example/CheckUsernameAPI";
import Example from "./components/example/Example";
import ExMethod from "./components/example/ExMethod";
import GetValuesEx from "./components/example/GetValuesEx";
import UseControllerEx from "./components/example/UseControllerEx";
import DependentFieldForm from "./components/specialCase/DependentFieldForm";
import DynamicFieldsForm from "./components/specialCase/DynamicFieldsForm";
import MUIForm from "./components/specialCase/MUIForm";
import NestedForm from "./components/specialCase/NestedForm";

function App() {
  return (
    <>
      <h1>Example</h1>
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
      <UseControllerEx />
      <hr />

      <h1>Method</h1>
      <ExMethod />
      <hr />
    </>
  );
}

export default App;
