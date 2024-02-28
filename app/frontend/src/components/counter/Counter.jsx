import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      <button className="btn btn-danger" onClick={() => setCount(0)}>
        Reset counter
      </button>
    </div>
  );
};

export default Counter;
