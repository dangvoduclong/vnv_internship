import { useState } from "react";

const Way2 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    // CALL API
    console.log({ name, email });
  };
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Way2;
