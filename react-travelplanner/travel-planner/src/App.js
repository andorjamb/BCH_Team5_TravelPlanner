import React, { Component } from "react";
import "./App.css";
import ExploreView from "./views/Explore/ExploreView";
import NavBar from "./components/NavBar/NavBar";

class App extends Component {
  state = {
    search: "",
    userName: "Homer",
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
    return (
      <div className="App">
        <ExploreView></ExploreView>
        <NavBar />
      </div>
    );
  }
}

export default App;
