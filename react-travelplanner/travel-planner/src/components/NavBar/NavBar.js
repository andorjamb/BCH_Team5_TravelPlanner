import React from "react";
import { Link } from 'react-router-dom';
import "./NavBar.css";

// import { Component } from "react";
// import UserAuth from '../../views/Profile/Context/Context'


const NavBar = (props) => {
  return (
    <div className="nav">

      <Link className='nav-item active' to='/'><span class="icon">explore</span>Explore</Link>
      <Link className="nav-item" to='/flight'><span class="icon">airplanemode_active<span>
      </span></span>Flight</Link>
      <Link className="nav-item" to='/planner'><span class="icon">location_on</span>Planner</Link>
      <Link className="nav-item" to='/profile/signin'><span class="icon">person</span> Profile</Link>

    </div>
  );
};

export default NavBar;
