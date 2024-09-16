import { useState } from "react";
const UpdateState = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  // update by callback

  // -> React batch synchronous event -> calculate based on count at the time of function call
  const updateDirectly = () => {
    setCount(count + 1);
    setCount(count + 1);
    setName("New Name");
    // console.log(count); -> not the latest value
  };

  // current state value
  const updateWithCallback = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  };
  const increaseAsync = () => {
    setTimeout(() => {
      setNumber(number + 1);
      //setNumber((prevNumber) => prevNumber + 1);
    }, 2000);
  };
  return (
    <div>
      <div>Count: {count}</div>
      <p>Name: {name}</p>
      <button onClick={updateDirectly}>Cập nhật trực tiếp</button>
      <button onClick={updateWithCallback}>Cập nhật bằng callback</button>
      <div>
        <p>Number: {number}</p>
        <button onClick={increaseAsync}>Increase Async</button>
      </div>
    </div>
  );
};

export default UpdateState;
