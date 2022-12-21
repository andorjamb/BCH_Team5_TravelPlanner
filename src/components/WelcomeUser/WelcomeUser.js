import React from "react";
import { UserAuth } from "../Context/Context";
import { Link } from 'react-router-dom';
import "./WelcomeUser.css";
import CheckAdmin from "../../adminActions/CheckAdmin";

const WelcomeUser = () => {
  const { logOut, user, role } = UserAuth();
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
    <div className="welcome-user">
      <div className="cover-img"></div>
      <div className="user-info">
        <img id="user-avatar" src={user?.photoURL ||
          'https://avatars.dicebear.com/v2/avataaars/da67f910f7ac4a0dbeaec3213b5f3d99.svg'}
          alt={user?.displayName || 'Guest'} />
         
   <div className="user-hello">
        Hello, {user?.displayName && (<div><span>{setName(user?.displayName)}</span><br />
          <button className="logout" onClick={handleSignOut}>Logout</button></div>)}
        {!user?.displayName && (<div><span>Welcome Guest</span><br /><Link to='/profile/signin'>Sign in</Link></div>)}
        <small>{role && <CheckAdmin></CheckAdmin>}</small>
      </div>
<i className="user-noti fa-solid fa-bell"> </i>
      </div>

      
    </div>

  );
};

export default WelcomeUser; 
