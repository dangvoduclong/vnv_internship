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

function ExpensiveCalculation(num) {
  console.log("Render ExpensiveCalculator");
  return num * 2;
}

function App() {
  const [number, setNumber] = useState(0);
  const [theme, setTheme] = useState("light");

  const themeStyle = {
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
  };
  const [count, setCount] = useState(0);

  // update state asynchronous -> not batch
  const increaseAsync = () => {
    setTimeout(() => {
      //setNumber(number + 1);
      setNumber((cur) => cur + 1);
    }, 2000);
  };
  // update obj state
  const [user, setUser] = useState({
    name: "John",
    age: 30,
    address: {
      city: "New York",
      state: "NY",
    },
  });
  console.log(user);
  const handleChangeObj = (e) => {
    setUser({ ...user, name: e.target.value });
  };
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form);

  /////////////////////////////////////////////////// useMemo
  const countValue = count;
  const countMemoValue = useMemo(() => count, [count]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const u = useMemo(() => ({ name: "John Wick" }), []);
  const doubledNumber = useMemo(() => {
    return ExpensiveCalculation(number);
  }, [number]);
  return (
    <>
      <div>
        <UpdateState />
      </div>
      <hr />
      <div>
        <HoldValueState />
      </div>
      <hr />

      <div>
        <button onClick={increaseAsync}>Increase Async</button>
        <h1>{number}</h1>
      </div>
      <div>
        <h1>useMemo Example</h1>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
        />
        <button onClick={() => setNumber(number + 1)}>Click number</button>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Đổi Theme
        </button>
        <div style={themeStyle}>Kết quả: {doubledNumber}</div>
      </div>
      <div className="App">
        <div className="wrapper">
          <button onClick={() => setCount(count + 1)}>Click</button>
          <div>Count: {countValue}</div>
          <div>Count Memo: {countMemoValue}</div>

          <br />
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <NameDisplay name={name} />
          <hr />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <EmailDisplay email={email} />
        </div>
        <div>
          <ChildComponent u={u} />
          <h1>END</h1>
        </div>
      </div>
      <div>
        <div>Update obj</div>
        <input type="text" onChange={handleChangeObj} />
      </div>
      <div>
        <input
          type="text"
          onChange={handleChangeForm}
          name="lastName"
          placeholder="Last Name"
        />
        <input
          type="text"
          onChange={handleChangeForm}
          name="firstName"
          placeholder="First Name"
        />
        <input
          type="text"
          onChange={handleChangeForm}
          name="email"
          placeholder="Email"
        />
      </div>

      <div>
        <h4>Test Way Binding</h4>
        <Way />
        <Way2 />
        <ExWay2Radio />
      </div>
      <hr />
      <div>
        <TestEffApi />
      </div>
      <hr />
    </>
  );
}

export default App;
