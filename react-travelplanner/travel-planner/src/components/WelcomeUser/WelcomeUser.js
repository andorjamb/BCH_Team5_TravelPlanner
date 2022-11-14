import React from "react";
import { UserAuth } from "../Context/Context";
import { Link } from 'react-router-dom';
import "./WelcomeUser.css";

const WelcomeUser = () => {
  const { logOut, user } = UserAuth();
  console.log(user?.photoURL);

  function setName(str) {
    if (user) {
      let indexFirstSpace = /\s/.exec(str).index;
      return str.slice(0, indexFirstSpace);
    }

  }

  const handleSignOut = async () => {
    try {
      await logOut();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="welcome">
      <div id="user-avatar">
        <img src={user?.photoURL ||
          'https://avatars.dicebear.com/v2/avataaars/da67f910f7ac4a0dbeaec3213b5f3d99.svg'}
          alt={user?.displayName || 'Guest'} />
      </div>

      <div className="user-hello">
        Hello, <br />
        {user?.displayName && (<div><span>{setName(user?.displayName)}</span><br />
          <button onClick={handleSignOut}>Logout</button></div>)}
        {!user?.displayName && (<div><span>Welcome Guest</span><br /><Link to='/profile/signin'>Sign in</Link></div>)}
      </div>

      <div className="user-noti"><i className="fa-solid fa-bell"></i>
      </div>
    </div>

  );
};

export default WelcomeUser; 
