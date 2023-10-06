import React, { useState } from "react";

export default function Counter() {
  const [count,setCount] = useState(0);
  const increment=()=>{
    setCount((prevCount)=>{
      prevCount = prevCount+1;
    });
    console.log(count);
  }
  const incrementFive=()=>{
    increment();
    increment();
    increment();
    increment();
    increment();
  }
  return (
    <div className="login">
      <div>{count}</div>
      <button onClick={incrementFive}>Increment</button>
    </div>
  );
}
