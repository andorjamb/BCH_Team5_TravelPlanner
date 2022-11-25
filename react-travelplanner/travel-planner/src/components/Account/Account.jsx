
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { trips } from '../../data/trips';
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

let newarray = [];
const items = [];
let yourTrips = [];
const Account = () => {
  const { logOut, user } = UserAuth();
  const owner = user ? user.uid : 'unknown';
  const ref = collection(db, 'myplan')

  const [Trips, setTrips] = useState([]);
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const myTrips = trips;
  //const [myTrips, setMyTrips] = useState({ mytrips });
  const navigate = useNavigate();

  const handleSignOut = async () => {

    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {

    if (user == null) {
      navigate('/');
    }


    const q = query(
      ref,
      //  where('owner', '==', currentUserId),
      where('title', '==', 'School1') // does not need index
      //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
      // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
      // limit(1)
    );

    setLoading(true);
    // const unsub = onSnapshot(q, (querySnapshot) => {     to be used when query is present
    const unsub = onSnapshot(ref, (querySnapshot) => {

      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setTrips(items);
      setLoading(false);
      console.log(items, Trips)
      setUserTrips(yourTrips);


    });
    return () => {
      newdata();
      unsub();
    };
    // eslint-disable-next-line
  }, []);

  function newdata() {
    newarray = items.filter((item) => item.userId === owner)
    return newarray.length;
  }


  function setName() {
    if (user) {
      let indexFirstSpace = /\s/.exec(user.displayName).index;
      return (user.displayName).slice(0, indexFirstSpace);
    }
  }

  const CurrentUserTrips = () => {
    return (
      items.filter((item) => item.userId === owner).map((mytrip) => (
        <div key={Math.random()}>

          <RecentTrips
            TotalTrip={mytrip.length}
            key={mytrip.transactionID}
            name={mytrip.tripname}
            // date={mytrip.tripdate.nanoseconds}
            sights={mytrip.sightname.length}
            sightLists={mytrip.sightname?.map((sight) => { return <ol key={Math.random()}><li key={sight}>{sight}</li></ol> })} >
            {console.log(mytrip.sightname)}
          </RecentTrips>
          <div key={mytrip.sightname}>



          </div>
        </div>

      )))
  }

  return (
    <div className="account-container">

      {/* <h2>Welcome, {user?.displayName}</h2>

      <div className="signoutButton">
        <button onClick={handleSignOut}>Logout</button>
      </div>

      <div className="profPictureContainer">
        <img className="profileImage" id="" src={user?.photoURL ||
          'https://avatars.dicebear.com/v2/avataaars/da67f910f7ac4a0dbeaec3213b5f3d99.svg'} alt="" />
      </div> */}
      <WelcomeUser />
      <section className="trip-details">
        <div className="completedTrips">


          {loading ? <h3>Loading Content.... </h3>
            : <div> <h3>You have  {newdata()} Trips</h3>
              <div>

                {CurrentUserTrips()}
              </div>
            </div>
          }


        </div>
        <div className="nextTrips">
          <div><h3>What Next?</h3></div>
          <h4>Explore more</h4>
          <div className="nextTriplist">
            <h3>total trips </h3>
            <NextTripList name={'happy trips'} />
          </div>
        </div>
      </section>
    </div >
  );
};

export default Account;
