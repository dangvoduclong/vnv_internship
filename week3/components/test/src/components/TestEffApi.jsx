import TestEff from "./TestEff";
import { useState } from "react";
import TestEff3 from "./TestEff3";
const TestEffApi = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Show Button Call</button>
      <div style={{ display: "flex" }}>
        {show && <TestEff />}
        {show && <TestEff3 />}
      </div>
    </div>
  );
};

export default TestEffApi;
