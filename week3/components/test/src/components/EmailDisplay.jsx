import React from "react";

const EmailDisplay = React.memo(({ email }) => {
  console.log("Render EmailDisplay");

  return <div>Your Email is {email}</div>;
});
EmailDisplay.displayName = "EmailDisplay";
export default EmailDisplay;
