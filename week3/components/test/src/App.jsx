import { useMemo, useState } from "react";
import "./App.css";
import NameDisplay from "./components/NameDisplay";
import EmailDisplay from "./components/EmailDisplay";
import ChildComponent from "./components/ChildComponent";

function ExpensiveCalculation(num) {
  console.log("Render ExpensiveCalculator");
  return num * 2;
}
function ExpensiveCalc() {
  console.log("Calculator");
  return 100;
}
function Counter() {
  const [count2, setCount2] = useState(0);
  return (
    <div>
      <p>You clicked {count2} times</p>
      <button onClick={() => setCount2(count2 + 1)}>Click me</button>
    </div>
  );
}
function Counter3({ count3, onIncrease3 }) {
  return (
    <div>
      <p>Giá trị count: {count3}</p>
      <button onClick={onIncrease3}>Tăng</button>
    </div>
  );
}
function App() {
  const [count3, setCount3] = useState(0);
  const [showCounter3, setShowCounter3] = useState(true);
  const handleIncrease3 = () => {
    setCount3(count3 + 1);
  };
  const [number, setNumber] = useState(0);
  const [theme, setTheme] = useState("light");

  const themeStyle = {
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
  };
  const [count, setCount] = useState(0);

  // update by callback

  // -> React batch synchronous event -> calculate based on count at the time of function call
  const updateDirectly = () => {
    setCount(count + 1);
    setCount(count + 1);
    // console.log(count); -> not the latest value
  };

  // current state value
  const updateWithCallback = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  };

  // Khởi tạo state với hàm (Lazy Initialization) -> calculate complex
  const [state, setState] = useState(() => ExpensiveCalc());
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

  console.log("Check render by price");
  const [price, setPrice] = useState({
    price: 0,
    discount: 0,
  });
  const handleCheckPrice = () => {
    setPrice({
      price: 0,
      discount: 0,
    });
  };
  const [showCounter, setShowCounter] = useState(true);
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
        <p>Giá trị state: {state}</p>
        <button onClick={() => setState(state + 1)}>
          increment when click not in render
        </button>
      </div>
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
          <button onClick={updateDirectly}>Cập nhật trực tiếp</button>
          <button onClick={updateWithCallback}>Cập nhật bằng callback</button>
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
        <button onClick={handleCheckPrice}>Check obj price</button>
      </div>
      <div>
        <button onClick={() => setShowCounter(!showCounter)}>
          Ẩn/Hiện bộ đếm
        </button>
        {showCounter && <Counter />}
      </div>
      <div>
        <button onClick={() => setShowCounter3(!showCounter3)}>
          Ẩn/Hiện bộ đếm
        </button>
        {showCounter3 && (
          <Counter3 count3={count3} onIncrease3={handleIncrease3} />
        )}
      </div>
    </>
  );
}

export default App;
