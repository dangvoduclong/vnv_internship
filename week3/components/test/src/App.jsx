import { useMemo, useState } from "react";
import "./App.css";
import NameDisplay from "./components/NameDisplay";
import EmailDisplay from "./components/EmailDisplay";
import ChildComponent from "./components/ChildComponent";
import Way from "./components/Way";
import ExWay2Radio from "./components/ExWay2Radio";
import Way2 from "./components/Way2";
import UpdateState from "./components/UpdateState";
import HoldValueState from "./components/HoldValueState";
import TestEffApi from "./components/TestEffApi";
import TestUseRef from "./components/TestUseRef";
import TestRefDOM from "./components/TestRefDOM";
import LazyInitial from "./components/LazyInitial";
import TestUseMemo1 from "./components/TestUseMemo1";
import TestUseMemo2 from "./components/TestUseMemo2";
import UpdateObjState from "./components/UpdateObjState";
import TestUseMemo3 from "./components/TestUseMemo3";
import TestUseEffect from "./components/TestUseEffect";
import TestUseCallBack from "./components/TestUseCallBack";
import Test from "./components/Test";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const u = useMemo(() => ({ name: "John Wick" }), []);

  return (
    <>
      <Test />
      {/* <h1>useState</h1>
      <div>
        <UpdateState />
      </div>
      <br />
      <div>
        <div>Update obj</div>
        <UpdateObjState />
      </div>
      <br />
      <div>
        <HoldValueState />
      </div>
      <div>
        <LazyInitial />
      </div>
      <br />
      <div>
        <ExWay2Radio />
      </div>
      <hr />
      <div>
        <h1>useRef</h1>
        <TestUseRef />
        <br />
        <TestRefDOM />
      </div>
      <hr />
      <div>
        <h1>useMemo Example</h1>
        <TestUseMemo1 />
        <br />
        <TestUseMemo2 />
        <br />
        <TestUseMemo3 />
      </div>
      <br />
      <div>
        <h1>React.memo</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <NameDisplay name={name} />
        <hr />
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <EmailDisplay email={email} />
        <br />
        <div>
          <ChildComponent u={u} />
        </div>
      </div>

      <div>
        <h4>Test Way Binding</h4>
        <Way />
        <Way2 />
      </div>
      <hr />
      <div>
        <h1>Use Effect</h1>
        <TestEffApi />
        <br />
        <TestUseEffect />
      </div>
      <hr />
      <div>
        <TestUseCallBack />
      </div> */}
    </>
  );
}

export default App;
