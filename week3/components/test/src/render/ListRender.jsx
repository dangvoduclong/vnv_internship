import React from "react";

const ListRender = () => {
  const items = ["Apple", "Banana", "Orange"];
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default ListRender;
