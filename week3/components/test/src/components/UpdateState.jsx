import { useState } from "react";
const UpdateState = () => {
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
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={updateDirectly}>Cập nhật trực tiếp</button>
      <button onClick={updateWithCallback}>Cập nhật bằng callback</button>
    </div>
  );
};

export default UpdateState;
