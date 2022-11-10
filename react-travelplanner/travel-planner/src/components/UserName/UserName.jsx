import React from "react";
import { UserAuth } from "../Context/Context";
import { Link } from 'react-router-dom';


export const UserName = () => {
    const { logOut, user } = UserAuth();
  console.log(user?.photoURL);
    const handleSignOut = async () => {
      try {
        await logOut();

      } catch (error) {
        console.log(error);
      }
    };
  
    return (
        <div>
          <div id="user-avatar">
        <img src={user?.photoURL || 'https://avatars.dicebear.com/v2/avataaars/da67f910f7ac4a0dbeaec3213b5f3d99.svg'}
         alt={user?.displayName || 'Guest'} />
      </div>
          Hello, <br />
           {user?.displayName &&  (<div><span>{user?.displayName}</span><br/>
        <button onClick={handleSignOut}>
          Logout
        </button>
        </div>)}
        {!user?.displayName && (
        <div><span>Welcome Guest</span><br/><Link to='/profile/signin'>Sign in</Link></div>)}
      </div>
    );
  };
  
//   export default UserName;