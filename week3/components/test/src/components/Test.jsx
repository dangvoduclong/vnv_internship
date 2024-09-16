import { useEffect, useState } from "react";
const Content = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => res.json())
      .then((posts) => {
        setTimeout(() => {
          setPosts(posts);
        }, 5000);
      });
  }, []);
  return <div>Content</div>;
};
const Test = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      {show && <Content />}
      <button onClick={() => setShow(!show)}>Show</button>
    </div>
  );
};

export default Test;
