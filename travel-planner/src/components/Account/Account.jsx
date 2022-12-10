import React, { useState, useEffect } from "react";
//import { useNavigate } from 'react-router-dom';
//import { Spinner } from 'react-bootstrap';
import { collection, onSnapshot, where, query, getDocs } from "@firebase/firestore";
import { db } from '../../FireBaseInit';
//import { UserAuth } from "../Context/Context";
import { onAuthStateChanged } from "firebase/auth";

import PastTrip from '../../components/PastTrip/PastTrip'
import ExploreTrips from "../../components/ExploreTrips/ExploreTrips"
import "./Account.css";

let dataArray = [];
let newCities = [];
let pastTripsArray = [];
let futureTripsArray = [];
let visitedCities = []


const Account = ({ user, signout }) => {

  const ref = collection(db, 'usersTrip');
  const dateToday = Date.now();

  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);
  const [Trips, setTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const [futureTrips, setFutureTrips] = useState([]);
  const [unvisitedCityNames, setUnvisitedCityNames] = useState([]);
  const [readyState, setReadyState] = useState([false])

  useEffect(() => {

    async function fetchUserID() {
      let owner = await user ? user.uid : null;
      console.log('setting user id:', user, owner);
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

    const visitedSights = [];
    const visitedCities = [];
    pastTrips.map((trip) => trip.sights.forEach((sight) => {
      visitedSights.push(sight.sightName)
    }));
    console.log('pastTrips', pastTrips);
    console.log('visited sights:', visitedSights)


    /* example sights array from db:     
    const sights = [{ sightName: 'Unto Seppänen Statue', cityName: 'Kouvola' },
        { sightName: 'St Nicholas Church', cityName: 'kotka' },
        { sightName: 'Satakunta Museum', cityName: 'pori' },
        { sightName: ' Wolkoff House Museum', cityName: 'lappeenranta' },
        { sightName: 'Lappia Hall', cityName: 'rovaniemi' }
        ] */

    pastTrips.map((trip) => trip.sights.forEach((sight) => {
      visitedCities.push(sight.cityName)
    }));
    console.log(visitedCities);

    const unvisitedCitiesSnapshot = async () => {
      const q = query(collection(db, 'cities'), where('city.cityName', 'not-in', `${visitedCities}`));
      q.docs.forEach((city) => {
        newCities.push(city.data());
      });
      let cityNamesArray = newCities.map((city) => city.cityName);
      setUnvisitedCityNames(cityNamesArray);
      return cityNamesArray;
    }
    unvisitedCitiesSnapshot();


    console.log(unvisitedCityNames);


  }, [pastTrips, futureTrips]);


  /*   const unvisitedCitiesList = () => {
      return (unvisitedCityNames.map((cityName) => (
        <li>
          {cityName}
        </li>
      )))
    } */


  return (
    <div className="account-container">
      <h2 className="title">Your Account</h2>
      {loading ? /* <Spinner color="primary">
        </Spinner>*/ <p>Loading...</p>
        : <>
          <section className="past-trips">
            <h3>You have completed {pastTrips.length} Trips! </h3>
            <h4>Places visited:</h4>
            <PastTrip arr={pastTrips} />
          </section>

          <section className="explore-trips">
            <h3>Ready for more?</h3>
            <h4>Explore these places:</h4>
            <ExploreTrips cityArray={unvisitedCityNames}
            />
            <p>(links to cities in Explore)</p>
          </section>
          <section className="future-trips">
            <h3>Your upcoming trips:</h3>
            <p>(links to Planner or the profile page being completed by Dang)</p>

          </section>
        </>
      }
    </div>)

}

export default Account;