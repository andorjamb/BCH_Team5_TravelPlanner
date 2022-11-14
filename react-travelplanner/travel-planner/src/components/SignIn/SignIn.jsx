import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from "../Context/Context";
import { useNavigate } from 'react-router-dom';
import './SignIn.css'

const SignIn = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/profile/account');
    }
  }, [user]);

  return (
    <div className="signin">
      <h1 >Sign in</h1>
      <p>Please sign in to view your profile:</p>
      <div className="googleButtonContainer">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default SignIn;