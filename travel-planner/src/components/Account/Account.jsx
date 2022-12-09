import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
//import { Spinner } from 'react-bootstrap';
import { collection, onSnapshot, where, query, getDocs } from "@firebase/firestore";
import { db } from '../../FireBaseInit';
import { UserAuth } from "../Context/Context";

import PastTrip from '../../components/PastTrip/PastTrip'
import ExploreTrips from "../../components/ExploreTrips/ExploreTrips"
import "./Account.css";

let dataArray = [];
let newCities = [];
let pastTripsArray = [];
let futureTripsArray = [];
let visitedCities = []

const Account = () => {

  const { logOut, user } = UserAuth();
  const ref = collection(db, 'usersTrip');
  const navigate = useNavigate();

  const [userID, setUserID] = useState(null);
  const [Trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pastTrips, setPastTrips] = useState([]);
  const [futureTrips, setFutureTrips] = useState([]);
  //const [visitedCities, setVisitedCities] = useState([]);
  const [unvisitedCityNames, setUnvisitedCityNames] = useState([]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const pastTripsFilter = (array) => {
    console.log(Trips);
    const dateToday = Date.now();
    Trips.forEach((trip) => {
      if (Date.parse(trip.tripDate) < dateToday) { pastTripsArray.push(trip) }
      else {
        futureTripsArray.push(trip);
      }
    })
    setFutureTrips(futureTripsArray);
    setPastTrips(pastTripsArray);

    console.log('in past trips filter function, past trips:', futureTripsArray)
    console.log('in past trips filter function, future trips:', pastTripsArray);
  }


  const extractVisitedCities = (arr) => {
    try {
      const visitedSights = arr.map((trip) => trip.sights);
      console.log(visitedSights);
      visitedCities = visitedSights.map((sight) => sight.cityName);
      console.log(visitedCities)
      //setVisitedCities(visitedCities);
    }
    catch (err) {
      console.log(err);
    }
    return visitedCities;
  }

  const unvisitedCitiesSnapshot = async () => {
    const q = query(collection(db, 'cities'), where('city.cityName', 'not-in', `${visitedCities}`));
    q.docs.forEach((city) => {
      newCities.push(city.data());
    });
    let cityNamesArray = newCities.map((city) => city.cityName);
    setUnvisitedCityNames(cityNamesArray);
  }

  const clearDataArray = () => {
    dataArray = [];
  }

  useEffect(() => {
    const owner = user ? user.uid : 'unknown';
    setUserID(owner);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    if (user == null) {
      navigate('/');
    }
    const q = query(ref, where('userID', '==', `${userID}`));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
        setTrips([...Trips, doc.data()]);
      });

      let pastTripsArray = pastTripsFilter(Trips); //filters into two arrays, past and future
      console.log('past trips:', pastTripsArray)
      console.log('future trips:', futureTrips)


      setLoading(false);

    });
    return () => {
      clearDataArray();
      unsub();
    };
  }, [userID]);


  useEffect(() => {
    if (visitedCities.length > 0) {
      extractVisitedCities(pastTrips);
      console.log(visitedCities);
      unvisitedCitiesSnapshot();
      console.log(unvisitedCityNames);
    }

  }, [pastTrips, futureTrips])

  const unvisitedCitiesList = () => {
    return (unvisitedCityNames.map((cityName) => (
      <li>
        {cityName}
      </li>
    )))
  }

  const pastTripList = (pastTrips) => {
    return (pastTrips.map((trip) => (
      <PastTrip
        name={trip.tripyName}
        date={trip.tripDate.toDateString()}
        sightLists={trip.sights?.map((sight) => (
          <li key={sight}>{sight.sightName} in : {sight.cityName}</li>))}
      ></PastTrip>
    )))

  }

  return (
    <div>
      <div className="account-container">
        {/*   {loading ? <Spinner color="primary">
        </Spinner>
          :  */}<>
          <h2 className="title">Your Account</h2>
          <section className="past-trips">
            <h3>You have completed {pastTrips.length} Trips! </h3>
            <h4>Places visited:</h4>

            {pastTripList(pastTrips)}
          </section>

          <section className="explore-trips">
            <h3>Ready for more?</h3>
            <h4>Explore these places:</h4>
            <ExploreTrips cityArray={unvisitedCityNames}
            />
            <p>links to Explore</p>
          </section>
          <section className="future-trips">
            <h3>Your upcoming trips:</h3>
            <p>links to Planner</p>

          </section>

        </>
        {/* } */}
      </div>
    </div>)

}

export default Account;
