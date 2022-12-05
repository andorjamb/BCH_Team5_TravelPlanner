
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  serverTimestamp, collection, getDocs, onSnapshot, where, setLoading,
  doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";
import { db } from '../../FireBaseInit';
import { UserAuth } from "../Context/Context";

import RecentTrips from "../../views/RecentTrips/RecentTrips";
import NextTripList from "../../views/NextTripList/NextTripList";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser"
import "./Account.css";

let dataArray= [];
const Account = () => {

  const { logOut, user } = UserAuth();
  //const owner = user ? user.uid : 'unknown';
  const ref = collection(db, 'usersTrip');
  const navigate = useNavigate();

  const [Trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pastTrips, setPastTrips] = useState([]);
  const [visitedCities, setVisitedCities] = useState([]);
  const [userID, setUserID] = useState(user.uid);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };


  //whole list of user Trips=> Trips[]
  //filter by date past => pastTrips[]
  //map pastTrips to array of visited cities => visitedCities[]
  //call functions in useEffect when Trips is populated

  function filterPastTrips (){
    const filteredArray = Trips.filter((trip)=>{

    })



  }

  useEffect(()=>{
     const owner = user ? user.uid : 'unknown';
    setUserID(owner);
  }, []);

  

  useEffect(() => {

    if (user == null) {
      navigate('/');
    }

    const q = query(ref, where('userID', '==', `${userID}`) // does not need index
      //  where('owner', '==', currentUserId),
      //  where('trips', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
      // orderBy('tripDate', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
      // limit(1)
    );
    setLoading(true);
    console.log(userID);
    const unsub = onSnapshot(q, (querySnapshot) => {   //  to be used when query is present
      // const unsub = onSnapshot(ref, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
       dataArray.push(doc.data());
      });
      setTrips(dataArray);
      console.log(dataArray);
      setLoading(false);

    });
    return () => {
      clearDataArray();
      unsub();
    };
    // eslint-disable-next-line
  }, []);

  const clearDataArray = () => {
    dataArray = [];
  }


  const CurrentUserTrips = () => {
    return (
      Trips.map((trip) => (
        <div>
          <RecentTrips
            TotalTrip={trip.length}
            key={trip.transactionID}
            name={trip.tripName}
            date={trip.tripDate}// { `${new Date(trip.tripdate?.seconds * 1000 + trip.tripdate?.nanoseconds/1000000)}`}


            sights={trip.sights.length}
            sightLists={trip.sights?.map((sight) => (
              <ol>
                <li key={sight}>{sight.sightName} in : {sight.cityName}</li>
              </ol>))} >
            {/* {console.log(trip.sightname)} */}
          </RecentTrips>
        </div>

      )))
  }

  return (
    <div className="account-container">
      <WelcomeUser />

      <section className="trips-container">
        <div className="title"><h3>Your Past Trips</h3></div>
        <div className="next-trips">

          {loading ? <h4>Loading Content.... </h4>
            : <div> <h3>You have  {Trips.length} Trips Planned</h3>
              <div>
                {CurrentUserTrips()}
              </div>
            </div>
          }

        </div>
        <div className="explore-trips">
          <h3>Ready for more?</h3>
          <div className="next-trip-list">
            <h4>Explore these places</h4>
            <NextTripList name={'happy trips'} />
          </div>
        </div>
      </section>
    </div >
  );
};

export default Account;
