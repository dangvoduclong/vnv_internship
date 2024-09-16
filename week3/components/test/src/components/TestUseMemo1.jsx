import { useMemo, useState } from "react";
function ExpensiveCalculation(num) {
  console.log("Render ExpensiveCalculator");
  return num * 2;
}
const TestUseMemo1 = () => {
  const [number, setNumber] = useState(0);
  const [theme, setTheme] = useState("light");

  const themeStyle = {
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
  };
  const doubledNumber = useMemo(() => {
    return ExpensiveCalculation(number);
  }, [number]);
  return (
    <div>
      <p>Number: {number}</p>
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
  );
};

export default TestUseMemo1;
