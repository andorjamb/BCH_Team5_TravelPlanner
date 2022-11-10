import React from "react";
import "./NavBar.css";

const NavBar = (props) => {
  return (
    <div className="nav">
      <div className="nav-item" onClick={() => {props.changeViewHandler("explore")}}>
        Explore
      </div>
      <div className="nav-item" onClick={() => {props.changeViewHandler("flight")}}>
        Flight
      </div>
      <div className="nav-item" onClick={() => {props.changeViewHandler("planner")}}>
        Planner
      </div>
      <div className="nav-item" onClick={() => {props.changeViewHandler("profile")}}>
        Profile
      </div>
    </div>
  );
};

export default NavBar;
