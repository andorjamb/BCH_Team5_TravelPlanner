import React from "react";
import "./NavBar.css";
import { Component } from "react";

const NavBar = (props) => {
  return (
    <div className="nav">
      <div className="nav-item active">Explore</div>
      <div className="nav-item">Flight</div>
      <div className="nav-item">Planner</div>
      <div className="nav-item">Profile</div>
    </div>
  );
};

export default NavBar;
