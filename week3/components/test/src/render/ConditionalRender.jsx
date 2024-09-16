import React from "react";

const ConditionalRender = ({ isLoggedIn }) => {
  return (
    <div>
      <div>{isLoggedIn ? <h2>Welcome, user!</h2> : <h2>Please log in</h2>}</div>
      <div>{isLoggedIn && <h2>Welcome back!</h2>}</div>
      <div>{isLoggedIn || <h2>Welcome back!</h2>}</div>
      <div>
        {(() => {
          if (isLoggedIn) {
            return <h2>Welcome back!</h2>;
          } else {
            return <h2>Please log in</h2>;
          }
        })()}
      </div>
    </div>
  );
};

export default ConditionalRender;
