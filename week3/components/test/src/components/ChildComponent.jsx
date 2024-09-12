import React from "react";

const ChildComponent = React.memo(({ u }) => {
  console.log("Render ChildComponent");

  return <div>User: {u.name}</div>;
});
ChildComponent.displayName = "ChildComponent";
export default ChildComponent;
