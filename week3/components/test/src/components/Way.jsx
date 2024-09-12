import { useState } from "react";

const Way = () => {
  const [name, setName] = useState("");
  console.log(name);

  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setName("BBBB")}>Change</button>
    </div>
  );
};

export default Way;
