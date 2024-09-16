import { useMemo, useState } from "react";

const TestUseMemo3 = () => {
  const [count, setCount] = useState(0);
  const countValue = count;
  const countMemoValue = useMemo(() => {
    // Giả lập phép toán nặng
    let result = 0;
    for (let i = 0; i < count * 1000; i++) {
      result += i;
    }
    return result;
  }, [count]);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <div>Count: {countValue}</div>
      <div>Count Memo: {countMemoValue}</div>
    </div>
  );
};

export default TestUseMemo3;
