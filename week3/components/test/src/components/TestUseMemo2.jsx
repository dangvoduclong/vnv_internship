import { useMemo, useRef, useState } from "react";

const TestUseMemo2 = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const nameRef = useRef();
  const handleSubmit = () => {
    setProducts([...products, { name, price: +price }]);
    setName("");
    setPrice("");
    nameRef.current.focus();
  };
  // console.log(products);
  // const total = products.reduce((acc, cur) => {
  //   console.log("Tinh toan total");
  //   return acc + cur.price;
  // }, 0);
  const total = useMemo(() => {
    const result = products.reduce((acc, cur) => {
      console.log("Tinh toan total");
      return acc + cur.price;
    }, 0);
    return result;
  }, [products]);
  return (
    <div>
      <input
        ref={nameRef}
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Enter name"
      />
      <br />
      <input
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        placeholder="Enter price"
      />
      <br />
      <button onClick={handleSubmit}>Add</button>
      <br />
      Total: {total}
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestUseMemo2;
