import React from "react";
import { Link } from 'react-router-dom';
import "./NavBar.css";

// import { Component } from "react";
// import UserAuth from '../../views/Profile/Context/Context'


const NavBar = (props) => {
  return (
    <div className="nav">

      <Link to='/'><div className="nav-item active">Explore</div></Link>
      <Link to='/flight'><div className="nav-item"><span class="icon">airplanemode_active<span class="material-symbols-outlined">

      </span></span>Flight</div></Link>
      <Link to='/planner'><div className="nav-item">Planner</div></Link>
      <Link to='/profile/signin'><div className="nav-item"><span class="icon">person</span> Profile </div></Link>

    </div>
  );
};

export default NavBar;
