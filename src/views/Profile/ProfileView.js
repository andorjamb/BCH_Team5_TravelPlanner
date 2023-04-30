import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileView.css";
import Account from '../../components/Account/Account';
import WelcomeUser from '../../components/WelcomeUser/WelcomeUser'

import { UserAuth } from "../../components/Context/Context";


const ProfileView = () => {

  const { logOut, user } = UserAuth();
  // const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };


  return (<div>
    <WelcomeUser />
    <Account user={user} signout={handleSignOut} />

  </div>
  )
}

export default ProfileView;
