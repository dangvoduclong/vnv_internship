import { useEffect, useState } from "react";

const TestUseEffect = () => {
  const [todos, setTodos] = useState([]);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    //if (isRender) {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((json) => {
        console.log("log json", json);
        setTodos(json);
      });
    //}
  }, []);
  console.log("render component Tet");
  console.log("log todos", todos);

  return (
    <div>
      {(todos || []).map((i) => (
        <div key={i.id}>{i.title}</div>
      ))}
      <button onClick={() => setIsRender(!isRender)}>render</button>
    </div>
  );
};

export default TestUseEffect;
