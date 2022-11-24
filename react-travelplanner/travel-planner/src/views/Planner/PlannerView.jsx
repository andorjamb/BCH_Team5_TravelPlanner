import React, { Component } from "react";
import "./PlannerView.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import SavedPlaces from "../../components/SavedPlaces/SavedPlaces";
import Trip from "../../components/Trip/Trip";
import { db } from "../../FireBaseInit";
import { collection, getDocs } from "firebase/firestore";

class PlannerView extends Component {
  state = {
    sights: [],
    trip: [],
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
    console.log(`Adding ${sightName} to trip`);
    this.tripData.push({cityName:cityName, sightName:sightName});
    console.log("New data added to tripData: ", this.tripData)
    this.setState({
      trip: this.tripData,
    });
  };
  renderSightList = () => {
    let sightList = this.state.sights.map((sight) => (
      <SavedPlaces
        key={sight.sightName}
        sightName={sight.sightName}
        cityName={sight.cityName}
        addTrip={this.addTrip}
      />
    ));
    return sightList;
  };
  renderTripList = () => {
    let tripList = this.state.trip.map((trip,index) => (
      <Trip
        index={index+1}
        key={trip.sightName}
        sightName={trip.sightName}
        cityName={trip.cityName}
        addTrip={this.addTrip}
      />
    ));
    return tripList;
  };

  render() {
    return (
      <div className="planner-view">
        <div className="cover-img"></div>
        <div className="plan-title">
          <div className="plan-info">
            <h1>Trip 1</h1>
            <div>
              <span class="material-symbols-outlined">calendar_month</span>
              <input type="date" placeholder="add dates"></input>
            </div>
          </div>
          <div className="edit-button">
            <span class="material-symbols-outlined">edit_square</span>
          </div>
        </div>
        <div className="plan-content">
          <h1>Places to visit</h1>
          <SearchBar />
          <h2>Search result</h2>

          <h2>Saved places</h2>
          <div className="saved-places-wrapper">{this.renderSightList()}</div>
          <h2>Trip details</h2>
          {this.renderTripList()}

          <h1>Notes</h1>
          <textarea
            className="plan-note"
            cols="50"
            rows="10"
            placeholder="Write anything here: tips and tricks, how to get around, budgeting, etc."
          ></textarea>
          <div className="plan-button">
            <button className="delete">Delete</button>
            <button className="save">Save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PlannerView;
