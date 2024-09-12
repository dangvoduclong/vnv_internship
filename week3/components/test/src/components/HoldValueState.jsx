import { useState } from "react";

function Counter() {
  const [count2, setCount2] = useState(0);
  console.log("render component child");
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
const HoldValueState = () => {
  console.log("Check render by price parent component");
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
  const [count3, setCount3] = useState(0);
  const [showCounter, setShowCounter] = useState(true);
  const [showCounter3, setShowCounter3] = useState(true);
  const handleIncrease3 = () => {
    setCount3(count3 + 1);
  };
  return (
    <div>
      <div>
        <button onClick={handleCheckPrice}>Check obj price</button>
      </div>
      <br />
      <div>
        <button onClick={() => setShowCounter(!showCounter)}>
          Ẩn/Hiện bộ đếm Counter
        </button>
        {showCounter && <Counter />}
      </div>
      <br />
      <div>
        <button onClick={() => setShowCounter3(!showCounter3)}>
          Ẩn/Hiện bộ đếm Counter 3
        </button>
        {showCounter3 && (
          <Counter3 count3={count3} onIncrease3={handleIncrease3} />
        )}
      </div>
    </div>
  );
};

export default HoldValueState;
