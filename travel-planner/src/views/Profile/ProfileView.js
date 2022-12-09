import React, { Component } from "react";
import "./ProfileView.css";
import Account from '../../components/Account/Account';
import WelcomeUser from '../../components/WelcomeUser/WelcomeUser'


class ProfileView extends Component {
  render() {
    return (<div>
    <WelcomeUser />
        <Account />

      </div>
    )
  }
}

export default ProfileView;
