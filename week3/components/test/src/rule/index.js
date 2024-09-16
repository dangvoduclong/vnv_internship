function MyComponent() {
  const [count, setCount] = useState(0); // Gọi Hook ở cấp cao nhất
  if (someCondition) {
    // Logic liên quan đến điều kiện
  }
  return <div>{count}</div>;
}

function MyComponent() {
  const [count, setCount] = useState(0); // Đúng, gọi trong component
  return <div>{count}</div>;
}

function useCustomHook() {
  const [count, setCount] = useState(0); // Đúng, gọi trong custom hook
  return count;
}

useEffect(() => {
  console.log(data); // Đúng: data được khai báo trong dependency array
}, [data]);

function MyComponent() {
  const [count, setCount] = useState(0); // Gọi ở ngoài vòng lặp
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

function useMyCustomHook() {
  // Đúng: tên custom hook bắt đầu bằng "use"
  const [value, setValue] = useState(0);
  return [value, setValue];
}
