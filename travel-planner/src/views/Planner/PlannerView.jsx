import React, { useEffect, useState } from "react";
import "./PlannerView.css";
import { Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { db } from "../../FireBaseInit";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { UserAuth } from "../../components/Context/Context";
import SearchBar from "../../components/SearchBar/SearchBar";
import SightList from "../../components/SightList/SightList";
import Trip from "../../components/Trip/Trip";
import Popup from "../../components/Popup/Popup";

const PlannerView = () => {
  const { logOut, user } = UserAuth();
  const [tripName, changeTripName] = useState("New Trip");
  const [tripDate, changeTripDate] = useState("");
  const [tripList, addTripList] = useState([]);
  const [sightList, addSightList] = useState([]);
  const [sightFilter, addSightFilter] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [notes, editNotes] = useState("");
  const [userID, setUserID] = useState();

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  /* UID for everyone:
- Jesse: OG04lGkSWibiXstJ4zWFdh92w8J2
- Anna: adPz97i9O6N4WOxE467OFMhKwgC3
- Dang: 4paHqkOpZoWosQCMZaDHKNmA3GK2
 */

  useEffect(() => {
    const owner = user ? user.uid : "unknown";
    setUserID(owner);
  }, [user, onAuthStateChanged])


  // fetch sights from db
  useEffect(() => {
    async function fetchSightData() {
      let sights = [];
      const querySnapshot = await getDocs(collection(db, "sights"));
      querySnapshot.docs.forEach((sight) => {
        sights.push(sight.data());
      });
      addSightList(sights);
    }
    fetchSightData();
  }, []);

  const addTrip = (sightName, cityName) => {
    let destination = { cityName: cityName, sightName: sightName };
    addTripList((oldArray) => [...oldArray, destination]);
    console.log("tripList ", tripList);
    if (searchParams == "") {
      addSightList(sightList.filter((sight) => sight.sightName !== sightName));
    } else {
      addSightList(sightList.filter((sight) => sight.sightName !== sightName));
      addSightFilter(
        sightFilter.filter((sight) => sight.sightName !== sightName)
      );
    }
  };

  const searchHandler = (e) => {
    setSearchParams(e.target.value);
    filter();
  };

  // search by both sight name and city name
  const filter = () => {
    const sightFilterArray = sightList.filter(
      (sight) =>
        sight.sightName.toLowerCase().includes(searchParams.toLowerCase()) ||
        sight.cityName.toLowerCase().includes(searchParams.toLowerCase())
    );
    addSightFilter(sightFilterArray);
  };

  const renderSightList = () => {
    // if there are no searchParams, show all sights.
    if (searchParams === "") {
      return sightList.map((sight) => (
        <SightList
          key={sight.sightName}
          sightName={sight.sightName}
          cityName={sight.cityName}
          addTrip={addTrip}
        />
      ));
    } else {
      return sightFilter.map((sight) => (
        <SightList
          sightName={sight.sightName}
          cityName={sight.cityName}
          addTrip={addTrip}
        />
      ));
    }
  };

  const renderTripList = () => {
    if (tripList.length == 0) {
      return (
        <p>Add destinations to your trip from the list below ( ͡❛ ‿‿ ͡❛) </p>
      );
    }
    let list = tripList?.map((trip, index) => (
      <Trip
        index={index + 1}
        key={trip.sightName}
        sightName={trip.sightName}
        cityName={trip.cityName}
        addTrip={addTrip}
      />
    ));
    return list;
  };

  const resetHandler = () => {
    window.location.reload();
  };

  const submitHandler = async (e) => {
    const dataToSubmit = {
      tripName: tripName,
      tripDate: tripDate,
      dayCreated: serverTimestamp(),
      dayUpdated: serverTimestamp(),
      sights: tripList,
      notes: notes,
      userID: userID,
      transactionID: uuidv4(),
    };
    console.log("Sending this data to firebase: -->>> ", dataToSubmit);
    // change collection of firebase db here
    await addDoc(collection(db, "usersTrip"), dataToSubmit);
    console.log("Add data successful!!!");
    console.log("redirect to plannerview .....");
  };

  // decide what content is shown in popup, depends on which button is clicked.
  const popupHandler = (e) => {
    console.log(e.target.value);
    setShowPopup(true);
    if (e.target.value == "save") {
      setPopupContent(
        <div>
          <h1>Are you sure?</h1>
          <p>You won't be able to edit them later (until we update that feature...)!</p>
          <div className="popup-button">
            <button className="delete" onClick={() => setShowPopup(false)}>
              Let me check once again
            </button>
            <Link to="/thankyou" onClick={submitHandler}>
              <button className="save">Yeah, save this trip!</button>
            </Link>
          </div>
        </div>
      );
    }
    if (e.target.value == "delete") {
      setPopupContent(
        <div>
          <h1>Are you sure you want to delete?</h1>
          <p>All unsaved data will be lost.</p>
          <div className="popup-button">
            <button className="save" onClick={() => setShowPopup(false)}>
              Actually, let me check again
            </button>
            <button className="delete" onClick={resetHandler}>
              Yeah, delete them all
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="planner-view">
      <div className="cover-img"></div>
      <form onSubmit={submitHandler}>
        <div className="plan-title">
          <div className="plan-info">
            <h1>Plan Details</h1>
            <label>Trip Name: </label>
            <input
              type="text"
              placeholder={tripName}
              onChange={(e) => changeTripName(e.target.value)}
            />
            <label>Trip date:</label>
            <input
              type="date"
              onChange={(e) => changeTripDate(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="plan-content">
          <h1>Trip details</h1>
          {renderTripList()}
          <h1>Places to visit </h1>
          <SearchBar searchEvent={searchHandler} />
          <div className="saved-places-wrapper"> {renderSightList()}</div>
          <h1>Notes </h1>
          <textarea
            className="plan-note"
            cols="50"
            rows="10"
            placeholder="Write anything here: tips and tricks, how to get around, budgeting, etc."
            onChange={(e) => editNotes(e.target.value)}
          ></textarea>
          <div className="plan-button">
            <button
              type="button"
              className="delete"
              value={"delete"}
              onClick={(e) => popupHandler(e)}
            >
              Delete
            </button>
            <button
              type="button"
              className="save"
              value={"save"}
              onClick={(e) => popupHandler(e)}
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <Popup trigger={showPopup} setShowPopup={setShowPopup}>
        {popupContent}
      </Popup>
    </div>
  );
};

export default PlannerView;
