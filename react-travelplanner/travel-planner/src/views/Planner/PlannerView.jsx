import React, { Component } from "react";
import "./PlannerView.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import SavedPlaces from "../../components/SavedPlaces/SavedPlaces";
import Trip from "../../components/Trip/Trip";
import { db } from "../../FireBaseInit";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

/* UID for everyone:
- Jesse: OG04lGkSWibiXstJ4zWFdh92w8J2
- Anna: adPz97i9O6N4WOxE467OFMhKwgC3
- Dang: 4paHqkOpZoWosQCMZaDHKNmA3GK2
 */
class PlannerView extends Component {
  state = {
    userID: "4paHqkOpZoWosQCMZaDHKNmA3GK2",
    sights: [],
    trip: [],
    tripName: "New Trip Name",
    tripDate: "",
    search: "",
    notes: "",
  };
  sightsData = [];
  tripData = [];
  componentDidMount = async () => {
    const querySnapshot = await getDocs(collection(db, "sights"));

    querySnapshot.docs.forEach((sight) => {
      this.sightsData.push(sight.data());
    });
    this.setState({
      sights: this.sightsData,
    });
  };
  addTrip = (sightName, cityName) => {
    // Push the clicked sight into another array, then set them into "trip" state
    this.tripData.push({ cityName: cityName, sightName: sightName });
    console.log("New data added to tripData: ", this.tripData);
    this.setState({
      trip: this.tripData,
    });
    // Filter out the click sight from search result
    this.sightsData = this.sightsData.filter((x) => x.sightName !== sightName);
    this.setState({
      sights: this.sightsData,
    });
  };

  renderTripList = () => {
    if (this.state.trip.length == 0) {
      return (
        <p>Add destinations to your trip from the list below ( ͡❛ ‿‿ ͡❛) </p>
      );
    }
    let tripList = this.state.trip.map((trip, index) => (
      <Trip
        index={index + 1}
        key={trip.sightName}
        sightName={trip.sightName}
        cityName={trip.cityName}
        addTrip={this.addTrip}
      />
    ));
    return tripList;
  };

  searchHandler = (e) => {
    console.log("Searching for ", e.target.value);
    this.setState({ search: e.target.value });
  };

  onChangeHandler = (e, itemToChange) => {
    if (itemToChange === "tripName") {
      this.setState({
        tripName: e.target.value,
      });
    }
    if (itemToChange === "tripDate") {
      this.setState({
        tripDate: e.target.value,
      });
    }
    if (itemToChange === "notes") {
      this.setState({
        notes: e.target.value,
      });
    }
  };

  resetHandler = () => {
    window.location.reload();
  };

  submitHandler = async (e) => {
    /*     e.preventDefault(); this prevent the link to be active, and also run the onclick event.
     */
    const dataToSubmit = {
      tripName: this.state.tripName,
      tripDate: this.state.tripDate,
      dayCreated: serverTimestamp(),
      dayUpdated: serverTimestamp(),
      sights: this.state.trip,
      notes: this.state.notes,
      userID: this.state.userID,
      transactionID: uuidv4(),
    };
    console.log("Sending this data to firebase: -->>> ", dataToSubmit);

    // change collection of firebase db here
    await addDoc(collection(db, "usersTrip"), dataToSubmit);
    console.log("Add data successful!!!");
    console.log("redirect to plannerview .....");
    return <Navigate to="/thankyou"></Navigate>;
  };

  render() {
    console.log("test ", this.props.navigation);
    // search by both sight name and city name
    const sightFilter = this.state.sights.filter((sight) => {
      return (
        sight.sightName
          ?.toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        sight.cityName?.toLowerCase().includes(this.state.search.toLowerCase())
      );
    });

    const renderSightList = sightFilter.map((sight) => (
      <SavedPlaces
        key={sight.sightName}
        sightName={sight.sightName}
        cityName={sight.cityName}
        addTrip={this.addTrip}
      />
    ));

    return (
      <div className="planner-view">
        <div className="cover-img"></div>

        <form onSubmit={this.submitHandler}>
          <div className="plan-title">
            <div className="plan-info">
              <h1>Plan Details</h1>
              <label>Trip Name: </label>
              <input
                type="text"
                placeholder={this.state.tripName}
                onChange={(e) => this.onChangeHandler(e, "tripName")}
              />
              <div>
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
                <input
                  type="date"
                  placeholder="add trip dates"
                  onChange={(e) => this.onChangeHandler(e, "tripDate")}
                ></input>
              </div>
            </div>
          </div>

          <div className="plan-content">
            <p>Active UID: {this.state.userID}</p>
            <h1>Trip details</h1>
            {this.renderTripList()}

            <h1>Places to visit</h1>
            <SearchBar searchEvent={this.searchHandler} />

            <div className="saved-places-wrapper">{renderSightList}</div>

            <h1>Notes</h1>
            <textarea
              className="plan-note"
              cols="50"
              rows="10"
              placeholder="Write anything here: tips and tricks, how to get around, budgeting, etc."
              onChange={(e) => this.onChangeHandler(e, "notes")}
            ></textarea>
            <div className="plan-button">
              <button
                type="button"
                className="delete"
                onClick={this.resetHandler}
              >
                Delete
              </button>
              <Link to="/thankyou" onClick={this.submitHandler}>
                <button type="submit" className="save">
                  Save
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default PlannerView;
