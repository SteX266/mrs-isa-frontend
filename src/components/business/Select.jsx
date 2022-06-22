import { Link } from "react-router-dom";
import React from "react";

export default function Select() {
  return (
    <div>
      <Link to="/host/home">
        {" "}
        <h1>HOST</h1>
      </Link>
      <Link to="/instructor/home">
        {" "}
        <h1>INSTRUCTOR</h1>
      </Link>
      <Link to="/captain/home">
        {" "}
        <h1>CAPTAIN</h1>
      </Link>
    </div>
  );
}
