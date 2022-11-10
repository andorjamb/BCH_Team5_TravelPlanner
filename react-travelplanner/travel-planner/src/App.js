import React, { Component } from "react";
import "./App.css";
import ExploreView from "./views/Explore/ExploreView";

import NavBar from "./components/NavBar/NavBar";

import FlightView from "./views/Flight/FlightView";
import PlannerView from "./views/Planner/PlannerView";
import ProfileView from "./views/Profile/ProfileView";

class App extends Component {
  state = {
    search: "",
    userName: "Homer",
    view: "explore",
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
        {viewRender()}
        <NavBar changeViewHandler={changeViewHandler}/>
      </div>
    );
  }
}

export default App;
