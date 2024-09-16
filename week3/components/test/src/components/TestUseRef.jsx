import React, { useEffect, useRef } from "react";
// save value qua reference ben ngoai function component
const TestUseRef = () => {
  const [count, setCount] = React.useState(60);
  const timerId = useRef();
  const prevCount = useRef();
  useEffect(() => {
    prevCount.current = count;
  }, [count]);
  const handleStart = () => {
    timerId.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(timerId.current);
  };
  console.log(prevCount.current, count);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default TestUseRef;
