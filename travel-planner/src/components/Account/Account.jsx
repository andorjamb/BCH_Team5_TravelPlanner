import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
//import { Spinner } from 'react-bootstrap';
import { collection, onSnapshot, where, query, getDocs } from "@firebase/firestore";
import { db } from '../../FireBaseInit';
import { UserAuth } from "../Context/Context";

import WelcomeUser from "../../components/WelcomeUser/WelcomeUser"
//import ExploreTrips from "../../components/ExploreTrips/ExploreTrips"
import "./Account.css";

let dataArray = [];
let cityData = [];

const Account = () => {

  const { logOut, user } = UserAuth();
  const ref = collection(db, 'usersTrip');
  const navigate = useNavigate();

  const [userID, setUserID] = useState(user.uid);
  const [Trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pastTrips, setPastTrips] = useState([]);
  const [visitedCities, setVisitedCities] = useState([]);
  const [cityNames, setCityNames] = useState([]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const pastTripsFilter = (array) => {
    const dateToday = Date.now();
    const pastTrips = array.filter((trip) =>
      Date.parse(trip.tripDate) < dateToday)
    return pastTrips;
  }

  const clearDataArray = () => {
    dataArray = [];
  }

  const extractVisitedCities = () => (pastTrips.map((trip) => trip.sights)).map((visit) => visit.cityName);

  const citiesSnapshot = async () => {
    await getDocs(collection(db, "cities"));
    citiesSnapshot.docs.forEach((city) => {
      cityData.push(city.data());
    });
    let cityNamesArray = cityData.map((city) => city.cityName);
    setCityNames(cityNamesArray);
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
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
      });
      setTrips(dataArray);
      citiesSnapshot();
      setLoading(false);

    });
    return () => {
      clearDataArray();
      unsub();
    };
  }, [userID]);


  useEffect(() => {
    let pastTrips = pastTripsFilter(Trips);
    setPastTrips(pastTrips);
    console.log('past trips:', pastTrips)
    setVisitedCities(extractVisitedCities());
  }, [Trips])


  const pastTripList = (pastTrips) => {
    pastTrips.map((trip) => (
      <div className="past-trip">
        <h3>{trip.tripName}</h3>
        <p>You visited on:{trip.tripDate}</p>
        <ol>
          {trip.sights?.map((sight) => (<li key={sight}>{sight.sightName} in : {sight.cityName}</li>))}
        </ol>
      </div>
    ))
  }

  const notVisited = () => {
    cityNames.filter((city) => !visitedCities.includes(city))
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
            {pastTripList}
          </section>

          <section className="explore-trips">
            <h3>Ready for more?</h3>
            <h4>Explore these places:</h4>
            {/* <ExploreTrips notVisited={notVisited()} /> */}
          </section>

        </>
        {/* } */}
      </div>

    </div>)

}

export default Account;
