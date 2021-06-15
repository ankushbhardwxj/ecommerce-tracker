import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <h2> WELCOME TO HOMEPAGE </h2>
      <Link to="/login">LOGIN BUTTON</Link>
    </div>
  );
};

export default Homepage;
