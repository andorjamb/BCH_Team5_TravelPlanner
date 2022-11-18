import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from "../Context/Context";


const SignOut = ()=>{
    const { logOut, user } = UserAuth();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
          await logOut()
        }   
        catch (error) {
          console.log(error);
        }
      };
useEffect(() => {
          if (!user) {
            navigate('/');
          }        }, [user]);

/* 
      if (!user) {
        return <>Loading</>;
      } */
return (  <div className="signoutButton">
        <button onClick={handleSignOut}>Logout</button>
      </div>    
)
    
}

export default SignOut;