import React, { useState, useEffect } from "react";
import { UserAuth } from "../Context/Context";
import RecentTrips from "../../views/RecentTrips/RecentTrips";
import NextTripList from "../../views/NextTripList/NextTripList";
import "./Account.css";
import { useNavigate } from 'react-router-dom';
import { trips } from '../../data/trips'

const Account = () => {
  
  const myTrips = trips;
  //const [myTrips, setMyTrips] = useState({ mytrips });
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  //const arrtrips = [];

  useEffect(() => {
    if (user == null) {
      navigate('/');
    }
  });

  function setName() {
    if (user) {
      let indexFirstSpace = /\s/.exec(user.displayName).index;
      return (user.displayName).slice(0, indexFirstSpace);
    }
  }


  /*  if (!user) {
     return <>Loading</>;
   } */

  const render = myTrips.map((item) => (
    
    <div key={item[user?.uid] + Math.random() }>
   <h3>
   {item[user?.uid]?.trips.length}
...........

    </h3>
      
     
      {item[user?.uid]?.trips.slice(0, 4).map((plan) => (
        <RecentTrips
          key={plan.name}
          name={plan.name}
          date={plan.date}
          imageUrl={plan.imageUrl}
          rating={plan.rating}
        />
      ))}
    </div>
  ));

  return (
    <div className="accountContainer">

      <h2>Welcome, {user?.displayName}</h2>

      <div className="signoutButton">
        <button onClick={handleSignOut}>Logout</button>
      </div>

      <div className="profPictureContainer">
        <img className="profileImage" id="" src={user?.photoURL ||
          'https://avatars.dicebear.com/v2/avataaars/da67f910f7ac4a0dbeaec3213b5f3d99.svg'} alt="" />
      </div>

      <div className="tripDetailsSection">
        <div className="completedTrips">
          <h3>Total trips</h3>
          {render}
        </div>
        <div className="nextTrips">
          <div><h3>What Next?</h3></div>
          <h4>Explore more</h4>
          <div className="nextTriplist">
            <h3>total trips </h3>
            <NextTripList name={'happy trips'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
