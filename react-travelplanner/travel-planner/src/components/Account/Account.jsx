import React, { useState, useEffect } from "react";
import { UserAuth } from "../Context/Context";
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  serverTimestamp, collection, getDocs, onSnapshot, where, setLoading,
  doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";

import RecentTrips from "../../views/RecentTrips/RecentTrips";
import NextTripList from "../../views/NextTripList/NextTripList";
import UpcomingTrips from "../../components/UpcomingTrips/UpcomingTrips";
import WelcomeUser from "../WelcomeUser/WelcomeUser";
import { db } from '../../FireBaseInit';
import "./Account.css";

const userTripsArray = [];

const Account = () => {
  const { logOut, user } = UserAuth();
  const owner = user ? user.uid : 'unknown';
  const ref = collection(db, 'myplan')

  console.log(user.uid);


  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);


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

<<<<<<< HEAD
    setLoading(true);
    // const unsub = onSnapshot(q, (querySnapshot) => {     to be used when query is present
    const unsub = onSnapshot(ref, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        userTripsArray.push(doc.data());
      });
      setUserTrips(userTrips);
      setLoading(false);
      console.log(userTrips);


    });


    return () => {

      unsub();
    };
    // eslint-disable-next-line
  }, []);

  /*    function getAllUserTrips(){
      const allUserTrips = ref.doc(owner).collection('trips').get();
      console.log(allUserTrips);
     }
=======
      setLoading(true);
      // const unsub = onSnapshot(q, (querySnapshot) => {     to be used when query is present
      const unsub = onSnapshot(ref, (querySnapshot) => {

          querySnapshot.forEach((doc) => {
              items.push(doc.data());
          });
          setTrips(items);
          setLoading(false);
          // console.log(items,Trips)
          setUserTrips(yourTrips);
         
         
      });
      return () => {
        newdata();
          unsub();
      };
      // eslint-disable-next-line
    }, []);
  
function newdata(){
  newarray =[];
newarray = items.filter((item) => item.userId === owner)
return newarray.length;
}
>>>>>>> c889b3d (removed console log)
 
      */
  const plannedTripArray = userTripsArray.filter((trip) => trip.departDate <= Date.now())


  /* function plannedTripCount(){
  newarray = userTripsArray.filter((item) => item.userId === owner)
  return newarray.length;
  } */



  function getThisCityArray() { }

  const PlannedTrips = () => userTripsArray.filter((trip) => trip.departDate <= Date.now())
    .map((trip) => {
      return (
        <UpcomingTrips
          tripName={trip.name}
          tripImg={`https://source.unsplash.com/500x400/?${trip.sights[0]}`}
          tripCities={getThisCityArray()}
        />)
    })

  /*   const CurrentUserTrips = () =>{ 
      return(
     userTripsArray.filter((item) => item.userId === owner).map((mytrip) => (
     <div key={Math.random()}>
      <RecentTrips
<<<<<<< HEAD
        TotalTrips ={mytrip.length}
        key={mytrip.transactionID}
        name={mytrip.tripname}     
        date = {mytrip.tripdate.nanoseconds} 
        sights ={mytrip.sightname.length} 
        sightLists={mytrip.sightname?.map((sight) => {return <ol key={Math.random()}><li key={sight}>{sight}</li></ol> })} >
          {console.log(mytrip.sightname)}
      </RecentTrips>
      <div key={mytrip.sightname}>    
      </div>
     </div>
    ) 
    )
    )}  */
=======
      TotalTrip ={mytrip.length}
      key={mytrip.transactionID}
      name={mytrip.tripname}     
      date = {mytrip.tripdate.nanoseconds} 
      sights ={mytrip.sightname.length} 
      sightLists={mytrip.sightname?.map((sight) => {return <ol key={Math.random()}><li key={sight}>{sight}</li></ol> })} >
        {/* {console.log(mytrip.sightname)} */}
    </RecentTrips>
    <div key={mytrip.sightname}>    
>>>>>>> c889b3d (removed console log)

  return (<div className="account-container">

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

      {loading ? <h3 className="loading">Loading Content... </h3>
        :
        <div className="planned-trip-container"> <h3>You have {plannedTripArray.length} Trips planned</h3>
          <div>
            {/*////////////////////////////////////////*/}
            {/* {CurrentUserTrips()}   */}
            {PlannedTrips}
            {/*///////////////////////////////////////////*/}
          </div>
        </div>
      }

      <div className="next-trips">
        <h3>What's Next?</h3>
        <h4>Explore more:</h4>
        <div className="nextTriplist">
          <NextTripList name={'happy trips'} />
        </div>
      </div>
      <div className="recent-trips">
        <h3>Your recent trips:</h3>

      </div>


    </section>
  </div>
  );
};

export default Account;
