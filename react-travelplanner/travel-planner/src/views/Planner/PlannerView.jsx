import React, { Component } from "react";
import "./PlannerView.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import SavedPlaces from "../../components/SavedPlaces/SavedPlaces";
import Trip from "../../components/Trip/Trip";
import { db } from "../../FireBaseInit";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";

class PlannerView extends Component {
  state = {
    userID: 1,
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

  submitHandler = async (e) => {
    e.preventDefault();
    // get Date data for created day of the plan
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const dataToSubmit = {
      tripName: this.state.tripName,
      tripDate: this.state.tripDate,
      dayCreated: date,
      sights: this.state.trip,
      notes: this.state.notes,
      userID: this.state.userID,
    };
    console.log("Sending this data to firebase: -->>> ", dataToSubmit)
    await addDoc(collection(db, "tripDemo"), dataToSubmit);
    console.log("Add data successful!!!");
  };

  render() {

    // search by both sight name and city name
    const sightFilter = this.state.sights.filter((sight) => {
      return (

        sight.sightName?.toLowerCase().includes(this.state.search.toLowerCase()) ||
        sight.cityName?.toLowerCase().includes(this.state.search.toLowerCase())
      )
    }
    );


    const renderSightList = sightFilter.map((sight) => (
      < SavedPlaces
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
              <label>Trip Name:  </label>
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
            <h1>Places to visit</h1>
            <SearchBar searchHandler={this.searchHandler} />


            <h2>Search results</h2>
            <div className="saved-places-wrapper">{renderSightList}</div>
            <h2>Trip details</h2>
            {this.renderTripList()}

            <h1>Notes</h1>
            <textarea
              className="plan-note"
              cols="50"
              rows="10"
              placeholder="Write anything here: tips and tricks, how to get around, budgeting, etc."
              onChange={(e) => this.onChangeHandler(e, "notes")}
            ></textarea>
            <div className="plan-button">
              <button className="delete">Delete</button>
              <button type={"submit"} className="save">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default PlannerView;
