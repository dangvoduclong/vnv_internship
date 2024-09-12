import { useState } from "react";
function ExpensiveCalc() {
  console.log("Calculator");
  return 100;
}
const LazyInitial = () => {
  // Khởi tạo state với hàm (Lazy Initialization) -> calculate complex
  const [state, setState] = useState(() => ExpensiveCalc());
  return (
    <div>
      <p>Giá trị state: {state}</p>
      <button onClick={() => setState(state + 1)}>
        increment when click not in render
      </button>
    </div>
  );
};

export default LazyInitial;
