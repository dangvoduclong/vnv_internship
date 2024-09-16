import React from "react";

const ExpressionRender = () => {
  const name = "React";
  const year = new Date().getFullYear();

  return (
    <div>
      <h2>Welcome to {name}!</h2>
      <p>The year is {year}</p>
    </div>
  );
};

export default ExpressionRender;
