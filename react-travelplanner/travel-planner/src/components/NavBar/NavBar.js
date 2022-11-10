import React from "react";
import { Link } from 'react-router-dom';
import "./NavBar.css";

// import { Component } from "react";
// import UserAuth from '../../views/Profile/Context/Context'


const NavBar = (props) => {
  return (
    <div className="nav">

      <Link className='nav-item active' to='/'><i class="fa-solid fa-compass"></i>Explore</Link>
      <Link className="nav-item" to='/flight'><i class="fa-solid fa-plane"></i>Flight</Link>
      <Link className="nav-item" to='/planner'><i class="fa-solid fa-location-dot"></i>Planner</Link>
      <Link className="nav-item" to='/profile/signin'><i class="fa-solid fa-user"></i>Profile</Link>

    </div>
  );
};

export default NavBar;
