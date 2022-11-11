import React from "react";
import { UserAuth } from "../Context/Context";
import RecentTrips from "../../views/RecentTrips/RecentTrips";
import "./Account.css";
import { useState } from "react";

let myplan = [
  {
    rU8A3axQNTNlFAvnHhsG6en5qVJ3: {
      trips: [
        {
          name: "jesse",
          date: "12/12/2022",
          imageUrl: "path",
          rating: 3,
        },
        {
          name: "limo",
          date: "12/12/2022",
          imageUrl: "path",
          rating: 4,
        },
        {
          name: "peter",
          date: "12/12/2022",
          imageUrl: "path",
          rating: 1,
        },
        {
          name: "tom",
          date: "12/12/2022",
          imageUrl: "path",
          rating: 5,
        },
      ],
    },
    rU8A3axQNTNlFAvnHhsG6en5qVJ4: {
      trip1: {
        name: "names",
        date: "12/12/2022",
        imageUrl: "path",
        rating: 4,
      },
    },
    rU8A3axQNTNlFAvnHhsG6en5qVJ5: {
      trip3: {
        name: "names",
        date: "12/12/2022",
        imageUrl: "path",
        rating: 4,
      },
    },
  },
];

const Account = () => {
  const [trips, settrips] = useState({});
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const arrtrips = [];

  if (!user) {
    return <>Loading</>;
  }

  const render = myplan.map((item) => (
    <div key={item[user?.uid] + Math.random()}>
      <h1>total trips {item[user?.uid]?.trips.length}</h1>
      {item[user?.uid]?.trips.slice(0, 4).map((plan) => (
        <RecentTrips
          key={plan.name}
          trip={plan}
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
      <div>
        <h2>Welcome, {user?.displayName}</h2>
      </div>
      <div className="profPictureContainer">
        <img className="profileImage" id="" src={user?.photoURL || 'https://avatars.dicebear.com/v2/avataaars/da67f910f7ac4a0dbeaec3213b5f3d99.svg'} alt="" />
      </div>
      <div className="signoutButton">
        <button onClick={handleSignOut}>Logout</button>
      </div>
      <div className="tripdetaailsSection">
        <div className="completedTrips">{render}</div>
        <div className="nextTrips"></div>
      </div>
    </div>
  );
};

export default Account;
