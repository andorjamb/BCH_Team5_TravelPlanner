import React, { useEffect, useState } from "react";
import "./FlightView.css";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";
import { onAuthStateChanged } from "firebase/auth";
import { UserAuth } from "../../components/Context/Context";
import { db } from "../../FireBaseInit";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import TestTrip from "./TestTrip";

const FlightView = () => {
  const { logOut, user } = UserAuth();
  const [userID, setUserID] = useState();
  const [userTrip, setUserTrip] = useState([]);
  const [pastTrip, setPastTrip] = useState([]);
  const [futureTrip, setFutureTrip] = useState([]);

  useEffect(() => {
    async function fetchUserID() {
      const owner = (await user) ? user.uid : null;
      setUserID(owner);
      console.log("userID: ", userID);
    }
    fetchUserID();
  }, [user, onAuthStateChanged]);

  useEffect(() => {
    async function fetchUserTrip() {
      const dateToday = Date.now();
      console.log("today is ", dateToday);
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
      console.log("run", filterUserTrip);
      setUserTrip(filterUserTrip);

      // filter a second time into two array: past and future trip
      filterUserTrip.forEach((a) => {
        console.log("checking trip name: ", a.tripName);
        if (Date.parse(a.tripDate) < dateToday) {
          console.log("this trip is in the past!");
          userPastTrip.push(a);
          setPastTrip(userPastTrip);
        } else {
          console.log("this trip is in the future");
          userFutureTrip.push(a);
          setFutureTrip(userFutureTrip);
        }
      });
      console.log("Future trips: ", userFutureTrip);
      console.log("Past trips: ", userPastTrip);
    }
    fetchUserTrip();
  }, [userID]);

  /* const test = () => {
    const q = query(ref, where('userID', '==', `${userID}`));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
        setTrips([...Trips, doc.data()]);
      }); })
  }
 */
  const renderUserTrip = (time) => {
    console.log(time);
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
    <div className="flight-view">
      <WelcomeUser></WelcomeUser>
      <div className="flight-content">
        <h1>All your trips are here:</h1>
        <h2>Past trips:</h2>
        {renderUserTrip("past")}
        <h2>Future trips:</h2>
        {renderUserTrip("future")}
        <button>Test</button>
      </div>
    </div>
  );
};

export default FlightView;
