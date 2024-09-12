import { useEffect, useState } from "react";

const TestEff3 = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log(`Mounted or Re-render ${count} times`);

    // cleanup func
    return () => {
      console.log(`Unmounted + Cleanup ${count} times`);
    };
  }, [count]);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Click Me!</button>
      {console.log(`ren ${count} times`)};
    </div>
  );
};

export default TestEff3;
