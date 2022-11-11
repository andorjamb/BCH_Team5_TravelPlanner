import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import "./NavBar.css";


// import UserAuth from '../../views/Profile/Context/Context'


const NavBar = (props) => {


  return (
    <div className="nav">

      <NavLink className="nav-item" to='/' ><i className="fa-solid fa-compass"></i>Explore</NavLink>
      <NavLink className="nav-item" to='/flight'><i className="fa-solid fa-plane"></i>Flight</NavLink>
      <NavLink className="nav-item" to='/planner'><i className="fa-solid fa-location-dot"></i>Planner</NavLink>
      <NavLink className="nav-item" to='/profile/signin'><i className="fa-solid fa-user"></i>Profile</NavLink>

    </div>
  );
};

export default NavBar;
