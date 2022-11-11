import React from "react";
import { UserAuth } from "../Context/Context";
import RecentTrips from "../../views/RecentTrips/RecentTrips"
import './Account.css';
import { useState } from 'react';

let  htmlString;
let myplan = [{
  rU8A3axQNTNlFAvnHhsG6en5qVJ3:{
    trip4:{
      name:"names",
      date:"12/12/2022",
      imageUrl:"path",
      rating:4
    }
    ,
    trip2:{
      name:"names",
      date:"12/12/2022",
      imageUrl:"path",
      rating:4
    },
    trip6:{
      name:"names",
      date:"12/12/2022",
      imageUrl:"path",
      rating:4
    },trip7:{
      name:"names",
      date:"12/12/2022",
      imageUrl:"path",
      rating:4
    }
  },
    rU8A3axQNTNlFAvnHhsG6en5qVJ4:{
      trip1:{
        name:"names",
        date:"12/12/2022",
        imageUrl:"path",
        rating:4
      }
  },
  rU8A3axQNTNlFAvnHhsG6en5qVJ5:{
    trip3:{
      name:"names",
      date:"12/12/2022",
      imageUrl:"path",
      rating:4
    }
}
}
]

const Account = () => {
  const [trips, settrips] = useState({});
    const { logOut, user } = UserAuth();
    
  
    const RecentTrips = () => {
  
       const arrtrips = []
       myplan.forEach(planning =>{
        arrtrips.push(planning.rU8A3axQNTNlFAvnHhsG6en5qVJ3);
      
      });
      console.log(trips);
      settrips(arrtrips);
       htmlString = arrtrips.map((trip) =>{
        return (
          <RecentTrips key={trip}
          trip={trip}
          name={trip.name}
          date ={trip.date}
          imageUrl={trip.imageUrl}
          rating={trip.rating}/> 
           );
        
      });
      
      console.log({htmlString});
      return {htmlString};
      };

    const handleSignOut = async () => {
      try {
        await logOut();
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      
      <div className="accountContainer">
        <div>
        <h2 >
          Welcome, {user?.displayName}</h2>
        </div>
        <div className="profPictureContainer">
          <img className="profileImage" id="" src="" alt=""/>
        </div>
        <div className="signoutButton">
        <button onClick={handleSignOut} >
          Logout
        </button>
        </div>
        <div className="tripdetaailsSection">
          <div className="completedTrips">

          </div>
          <div className="nextTrips">

          </div>

        </div>
        {htmlString}
        {RecentTrips}
      </div>
    );
  };
  
  export default Account;