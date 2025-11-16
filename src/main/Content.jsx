import React, { useState } from "react";
import "./Main.css";

function Content() {
  const [heading, setHeading] = useState("Welcome to React UI!");

  return (
    <div className="content">
      <h1>{heading}</h1>
      <input
        type="text"
        placeholder="Type a new heading..."
        onChange={(e) => setHeading(e.target.value)}
        className="input-box"
      />
    </div>
  );
}

export default Content;
