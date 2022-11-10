import React from "react";
import { UserAuth } from "./Context/Context";

const Account = () => {
    const { logOut, user } = UserAuth();
  
    const handleSignOut = async () => {
      try {
        await logOut();
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div >
        <h1 >Account</h1>
        <div>
          <p>Welcome, {user?.displayName}</p>
        </div>
        <button onClick={handleSignOut} >
          Logout
        </button>
      </div>
    );
  };
  
  export default Account;