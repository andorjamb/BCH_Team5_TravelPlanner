import React, { Component } from "react";
import "./ProfileView.css";
import Account from '../../components/Account/Account';
import WelcomeUser from '../../components/WelcomeUser/WelcomeUser'
import UpcomingTrips from "../../components/UpcomingTrips/UpcomingTrips";

class ProfileView extends Component {
  render() {
    return (<div><h1>This is ProfileView</h1>
    <WelcomeUser />
        <Account />

      </div>
    )
  }
}

export default ProfileView;
