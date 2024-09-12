import { useEffect, useState } from "react";

const Tet = () => {
  const [todos, setTodos] = useState([]);
  const [isRender, setIsRender] = useState(false);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((json) => {
        console.log("log json", json);
        setTodos(json);
      });
  }, [isRender]);
  console.log("render component Tet");
  return (
    <div>
      {(todos || []).map((i) => {
        <div key={i.id}>{i.title}</div>;
      })}
      <button onClick={() => setIsRender(!isRender)}>render</button>
    </div>
  );
};

export default Tet;
