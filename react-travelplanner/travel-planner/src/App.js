import React, { Component } from "react";
import "./App.css";
import ExploreView from "./views/Explore/ExploreView";

import NavBar from "./components/NavBar/NavBar";
import AddCity from "./adminActions/addCity"

import FlightView from "./views/Flight/FlightView";
import PlannerView from "./views/Planner/PlannerView";
import ProfileView from "./views/Profile/ProfileView";

class App extends Component {
  state = {
    search: "",
    userName: "Homer",
    view: "flight",
  };
  /* 
  useEffect(()=>{
    /* global google 
// this is for future use with OAuth and React Hooks
  }, []); */

  searchHandler = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    const viewRender = () => {
      switch (this.state.view) {
        case "explore":
          return <ExploreView></ExploreView>;
        case "flight":
          return <FlightView></FlightView>;
        case "planner":
          return <PlannerView></PlannerView>;
        case "profile":
          return <ProfileView></ProfileView>;
        default:
          return <ExploreView></ExploreView>;
      }
    };
    const changeViewHandler = (value) => {
      this.setState({ view: value });
      console.log("view changed to ", value);
    };
    return (
      <div className="App">
        <ExploreView></ExploreView>
        <AddCity/>
       
        <NavBar />
        
        {viewRender()}
        <div className="nav">
          <div
            onClick={() => {
              changeViewHandler("explore");
            }}
            className="nav-item active"
          >
            Explore
          </div>
          <div
            onClick={() => {
              changeViewHandler("flight");
            }}
            className="nav-item"
          >
            Flight
          </div>
          <div
            onClick={() => {
              changeViewHandler("planner");
            }}
            className="nav-item"
          >
            Planner
          </div>
          <div
            onClick={() => {
              changeViewHandler("profile");
            }}
            className="nav-item"
          >
            Profile
          </div>
        </div>
      </div>
    );
  }
}

export default App;
