import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
//import { Spinner } from 'react-bootstrap';
import { collection, onSnapshot, where, query, getDocs } from "@firebase/firestore";
import { db } from '../../FireBaseInit';
import { onAuthStateChanged } from "firebase/auth";
//import { UserAuth } from "../Context/Context";

import PastTrip from '../../components/PastTrip/PastTrip'
import ExploreTrips from "../../components/ExploreTrips/ExploreTrips"
import "./Account.css";

let dataArray = [];
let newCities = [];
let pastTripsArray = [];
let futureTripsArray = [];

const Account = ({ user, signout }) => {

  const ref = collection(db, 'usersTrip');
  const dateToday = Date.now();

  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);
  const [Trips, setTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const [futureTrips, setFutureTrips] = useState([]);
  const [unvisitedCities, setUnvisitedCities] = useState([]);
  const [visitedCities, setVisitedCities] = useState([]);
  const [readyState, setReadyState] = useState([false])

  useEffect(() => {

    async function fetchUserID() {
      let owner = await user ? user.uid : null;
      setUserID(owner);
      setReadyState(true);
    }

    fetchUserID();

  }, [user, onAuthStateChanged]);

  useEffect(() => {
    if (readyState === false) { console.log('awaiting user') }
    const q = query(ref, where('userID', '==', `${userID}`));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
      });
      setTrips(dataArray);
      dataArray.forEach((trip) => {
        if (Date.parse(trip.tripDate) < dateToday) {
          pastTripsArray.push(trip)

        }
        else {
          futureTripsArray.push(trip);

        }
      })
      setFutureTrips(futureTripsArray);
      setPastTrips(pastTripsArray);
      resetArrays();
    });
    return () => {

      unsub();
    };
  }, [userID, readyState]);


  const resetArrays = () => {
    dataArray = [];
    futureTripsArray = [];
    pastTripsArray = [];
  }

  useEffect(() => {
    setLoading(false);
    const visitedSights = pastTrips.reduce((acc, trip) => {
      const sightNames = trip.sights.map(sight => sight.sightName);
      return [...acc, ...sightNames];
    }, []);

    const visitedCities = pastTrips.reduce((acc, trip) => {
      const sightNames = trip.sights.map(sight => sight.sightName);
      return [...acc, ...sightNames];
    }, []);

    setVisitedCities(visitedCities);


  }, [pastTrips, futureTrips])

  useEffect(() => {
    async function getCities() {
      newCities = [];
      const citySnapshot = await getDocs(collection(db, "cities"));
      citySnapshot.docs.forEach((doc) => {
        if (!visitedCities.includes(doc.data().cityName)) {
          newCities.push(doc.data().cityName);
        }

      });
      setUnvisitedCities(newCities);

    }
    getCities();
  }, [visitedCities])

  const futureTripList = futureTrips.map((trip,index) => (
    <li key={trip.tripName+index}>   <Link to={'/trip'}>  {trip.tripName} </Link> </li>
  ))


  return (
    <div className="account-container">
      <h2 className="title">Your Account</h2>
      {loading ? /* <Spinner color="primary">
        </Spinner>*/ <p>Loading...</p>
        : <>
          <section className="past-trips">
            <h3>You have completed {pastTrips.length} Trips </h3>
            <PastTrip arr={pastTrips} />
          </section>

          <section className="explore-trips">
            <h3>Ready for more?</h3>
            <h4>Explore these places:</h4>
            <ExploreTrips cityArray={unvisitedCities} />


          </section>
          <section className="future-trips">
            <h3>Your upcoming trips:</h3>
            <ul>{futureTripList}</ul>


          </section>
        </>
      }
    </div>)

}

export default Account;