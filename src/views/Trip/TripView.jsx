import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TripView.css";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";
import { onAuthStateChanged } from "firebase/auth";
import { UserAuth } from "../../components/Context/Context";
import { db } from "../../FireBaseInit";
import { collection, getDocs } from "firebase/firestore";
import TestTrip from "./TestTrip";

const TripView = () => {
  const { logOut, user } = UserAuth();
  const [userID, setUserID] = useState();
  const [userTrip, setUserTrip] = useState([]);
  const [pastTrip, setPastTrip] = useState([]);
  const [futureTrip, setFutureTrip] = useState([]);

  useEffect(() => {
    async function fetchUserID() {
      const owner = (await user) ? user.uid : null;
      setUserID(owner);
  
    }
    fetchUserID();
  }, [user, onAuthStateChanged]);

  useEffect(() => {
    async function fetchUserTrip() {
      const dateToday = Date.now();
   
      let trips = [];
      let userPastTrip = [];
      let userFutureTrip = [];

      // fetch everything
      const querySnapshot = await getDocs(collection(db, "usersTrip"));
      querySnapshot.docs.forEach((trip) => {
        trips.push(trip.data());
      });
      // filter all fetched trips with user ID
      const filterUserTrip = trips.filter((a) => a.userID == userID);
      setUserTrip(filterUserTrip);

      // filter a second time into two array: past and future trip
      filterUserTrip.forEach((a) => {
 
        if (Date.parse(a.tripDate) < dateToday) {
        
          userPastTrip.push(a);
          setPastTrip(userPastTrip);
        } else {
       
          userFutureTrip.push(a);
          setFutureTrip(userFutureTrip);
        }
      });
 
    }
    fetchUserTrip();
  }, [userID]);

  const renderUserTrip = (time) => {
   
    if (time === "past") {
      let past = pastTrip?.map((trip) => (
        <TestTrip
          key={trip.transactionID}
          tripName={trip.tripName}
          tripDate={trip.tripDate}
          sights={trip.sights}
        />
      ));
      return past;
    }
    if (time === "future") {
      let future = futureTrip?.map((trip) => (
        <TestTrip
          key={trip.transactionID}
          tripName={trip.tripName}
          tripDate={trip.tripDate}
          sights={trip.sights}
        />
      ));
      return future;
    }

    /* if (userTrip === []) {
      console.log(true);
      return (
        <p>
          Go to planner view and start planning for your next trip ( ͡❛ ‿‿ ͡❛)
        </p>
      );
    }
    let list = userTrip?.map((trip) => (
      <TestTrip
        key={trip.transactionID}
        tripName={trip.tripName}
        tripDate={trip.tripDate}
        sights={trip.sights}
      />
    ));
    return list; */
  };

  return (
    <div className="trip-view">
      <WelcomeUser></WelcomeUser>
      <div className="trip-content">
        <h1>All your trips are here:</h1>
        <h2>Past trips:</h2>
        <div className="trip-view-wrapper">{renderUserTrip("past")}</div>
        <h2>Future trips:</h2>
        <div className="trip-view-wrapper"> {renderUserTrip("future")}</div>
        <h2>You can create new trip with the planner !</h2>
        <Link to="/planner">
          <button className="save">Create new trip</button>
        </Link>
      </div>
    </div>
  );
};

export default TripView;
