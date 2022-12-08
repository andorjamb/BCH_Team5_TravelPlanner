
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { collection, onSnapshot, where, query } from "@firebase/firestore";
import { db } from '../../FireBaseInit';
import { UserAuth } from "../Context/Context";

import RecentTrips from "../../views/RecentTrips/RecentTrips";
import NextTripList from "../../views/NextTripList/NextTripList";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser"
import "./Account.css";

let dataArray = [];
const Account = () => {

  const { logOut, user } = UserAuth();
  //const owner = user ? user.uid : 'unknown';
  const ref = collection(db, 'usersTrip');
  const navigate = useNavigate();

  const [userID, setUserID] = useState(user.uid);
  const [Trips, setTrips] = useState([]); //user's trips
  const [loading, setLoading] = useState(true);
  const [pastTrips, setPastTrips] = useState([]);
  const [visitedCities, setVisitedCities] = useState([]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  //map pastTrips to array of visited cities => visitedCities[]
  //call functions in useEffect when Trips is populated

  const pastTripsFilter = (array) => {
    const dateToday = Date.now();
    const pastTrips = array.filter((trip) =>
      Date.parse(trip.tripDate) < dateToday)
    return pastTrips;
  }

  useEffect(() => {
    const owner = user ? user.uid : 'unknown';
    setUserID(owner);
  }, []);



  useEffect(() => {

    setLoading(true);
    if (user == null) {
      navigate('/');
    }

    const q = query(ref, where('userID', '==', `${userID}`));
    console.log(userID);
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
      });
      setTrips(dataArray);
      setLoading(false);

    });
    return () => {
      clearDataArray();
      unsub();
    };
  }, []);

  const clearDataArray = () => {
    dataArray = [];
  }

  useEffect(() => {
    let pastTrips = pastTripsFilter(Trips);
    setPastTrips(pastTrips);
  }, [Trips])


  const pastTripList = () => {
    return (
      (pastTrips.map((trip) => (
        <RecentTrips
          key={trip.transactionID}
          name={trip.tripName}
          date={trip.tripDate}
          sightLists={trip.sights?.map((sight) => (
            <ol>
              <li key={sight}>{sight.sightName} in : {sight.cityName}</li>
            </ol>))} >
        </RecentTrips>

      ))))
  }

  return (
    <div className="account-container">
      <WelcomeUser />

      <div className="trips-container">
        {loading ? <Spinner color="primary">
        </Spinner>
          : <>
            <section className="past-trips">
              <h3>Your Past Trips</h3>

              <h3>You have completed {pastTrips.length} Trips </h3>
              <h4>Cities visited:</h4>

            </section>

            <div className="explore-trips">
              <h3>Ready for more?</h3>
              <h4>Explore these places</h4>
              <NextTripList name={'happy trips'} />
            </div>

          </>}
      </div>

    </div>)

}

export default Account;
