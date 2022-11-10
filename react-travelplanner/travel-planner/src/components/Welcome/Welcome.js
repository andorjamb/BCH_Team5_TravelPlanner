import React from "react";
import "./Welcome.css";
import { UserName } from '../UserName/UserName';

const Welcome = (props) => {

  return (

    <div className="welcome">
      <div id="user-avatar">
        <img src="https://source.unsplash.com/500x400/?man" alt="user avatar" />
      </div>
      <div id="user-hello">

        Hello, <br />
        <UserName />


      </div>
    </div>
  );
};

export default Welcome;
