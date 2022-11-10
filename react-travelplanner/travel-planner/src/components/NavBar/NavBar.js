import React from "react";
import { Link } from 'react-router-dom';
import "./NavBar.css";

// import { Component } from "react";
// import UserAuth from '../../views/Profile/Context/Context'



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

      
      <div className="nav-item active"><Link to='/'>Explore</Link></div>
      <div className="nav-item"><Link to='/flight'>Flight</Link> </div>
      <div className="nav-item"><Link to='/planner'>Planner</Link> </div>
      
      <div className="nav-item"> <Link to='/profile/signin'>Profile</Link> </div> 

    </div>
  );
};

export default NavBar;
