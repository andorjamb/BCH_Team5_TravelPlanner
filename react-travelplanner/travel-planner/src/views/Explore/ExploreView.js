import React, { Component } from "react";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";
import SearchBar from "../../components/SearchBar/SearchBar";
import CityExplore from "../../components/CityExplore/CityExplore";
import Account from "../../components/Account/Account";
import "./ExploreView.css";
import AddCity from "../../adminActions/AddCity.jsx"
import TestRealtimeFirebase from "../../adminActions/TestRealtimeFirebase";
//import AddCityTripPlaces from "../../adminActions/AddCityTripPlaces";

/** */

const ViewMode = {
  List: 1,
  Expand: 2,
  ExpandFull: 3,
};


class ExploreView extends Component {

  state = {
    search: "",
    viewMode: ViewMode.List,
    user:'Username'
  };



  componentDidUpdate(){
    
  }

  render() {

    const viewMode = this.state.viewMode;
    let viewShown = null;
    switch (viewMode) {
      case ViewMode.Expand: {
        viewShown = <div className="view">ViewMode.Expand</div>;
        break;
      }
      case ViewMode.ExpandFull: {
        viewShown = <div className="view">ViewMode.ExpandFull</div>;
        break;
      }
      default: {
        viewShown = (
          <div className="view">
            <WelcomeUser userName={this.state.userName} />
            <div className="explore-intro">
              <p>Ready for an adventure?</p>
            </div>
            

            <CityExplore />
            {/* <TestRealtimeFirebase/> */}
           {/* <AddCityTripPlaces/> */}
          </div>
        );
        break;
      }
    }

    return <div className="explore-view">
      {viewShown}

    </div>;
  }
}

export default ExploreView;
