import React from "react";
import "./NavBar.css";
const NavBar = () => {
  return (
    <div className="nav">
      <div className="nav-item active">
        <a href="#">Explore</a>
      </div>
      <div className="nav-item">
        <a href="#">Flight</a>
      </div>
      <div className="nav-item">
        <a href="#">Planner</a>
      </div>
      <div className="nav-item">
        <a href="#">Profile</a>
      </div>
    </div>
  );
};

export default NavBar;
