import React, { Component } from "react";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";
import CityExplore from "../../components/CityExplore/CityExplore";
//import Account from "../../components/Account/Account";
import "./ExploreView.css";
import AddCity from "../../adminActions/AddCity.jsx"
import TestRealtimeFirebase from "../../adminActions/TestRealtimeFirebase";
//import AddCityTripPlaces from "../../adminActions/AddCityTripPlaces";

class ExploreView extends Component {

  state = {
    user: 'Username'
  };

  render() {
    const viewShown = (
      <div className="view">
        <WelcomeUser userName={this.state.userName} />
        <div className="explore-intro"> {/* explore component contains searchBar */}
          <p>Ready for an adventure?</p>
        </div>

        <CityExplore />
        <TestRealtimeFirebase />
        {/* <AddCityTripPlaces/> */}
      </div>
    );

    return <div className="explore-view">{viewShown}</div>

  }

}

export default ExploreView;