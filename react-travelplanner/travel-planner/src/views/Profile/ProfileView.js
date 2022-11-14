import React, { Component } from "react";
import "./ProfileView.css";
import Account from '../../components/Account/Account';

class ProfileView extends Component {
  render() {
    return
    (
      <div>
        <h1>This is ProfileView</h1>
        <Account />
      </div>
    )
  }
}

export default ProfileView;
