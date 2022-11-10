import React from "react";
import "./Welcome.css";
import { UserName } from '../UserName/UserName';

const Welcome = (props) => {

  return (

    <div className="welcome">
      
      <div id="user-hello">
       
          
          <UserName/>
          
      </div>
    </div>
  );
};

export default Welcome;
