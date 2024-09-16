import React, { useCallback } from "react";
const Memocontent = React.memo(Content);
function Content({ onIncrease }) {
  console.log("Content re-render - test useCallback");
  return (
    <>
      <h5>test useCallback</h5>
      <button onClick={onIncrease}>Increase</button>
    </>
  );
}
const TestUseCallBack = () => {
  const [count, setCount] = React.useState(0);
  const handleIncrease = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);
  return (
    <div>
      <Content onIncrease={handleIncrease} />
      <Memocontent onIncrease={handleIncrease} />
      <div>{count}</div>
    </div>
  );
};

export default TestUseCallBack;
