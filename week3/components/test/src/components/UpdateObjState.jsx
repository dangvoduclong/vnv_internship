import { useState } from "react";

const UpdateObjState = () => {
  // update obj state
  const [user, setUser] = useState({
    name: "John",
    age: 30,
    address: {
      city: "New York",
      state: "NY",
    },
  });
  console.log(user);
  const handleChangeObj = (e) => {
    setUser({ ...user, name: e.target.value });
  };
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form);
  return (
    <div>
      <div>
        <input type="text" onChange={handleChangeObj} />
      </div>
      <div>
        <input
          type="text"
          onChange={handleChangeForm}
          name="lastName"
          placeholder="Last Name"
        />
        <input
          type="text"
          onChange={handleChangeForm}
          name="firstName"
          placeholder="First Name"
        />
        <input
          type="text"
          onChange={handleChangeForm}
          name="email"
          placeholder="Email"
        />
      </div>
    </div>
  );
};

export default UpdateObjState;
