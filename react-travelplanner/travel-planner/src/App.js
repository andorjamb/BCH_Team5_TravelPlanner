import React, { Component } from "react";
import "./App.css";
<<<<<<< HEAD
import ExploreView from "./views/Explore/ExploreView";
import NavBar from "./components/NavBar/NavBar";
=======
import Welcome from "./Welcome";
import Intro from "./Intro";
import SearchBar from "./SearchBar";
import CityExplore from "./CityExplore";
import Main from './Main';
import Testing from './explore/test';

>>>>>>> 1c6f7fd (database connection successful)

class App extends Component {
  state = {
    search: "",
    userName: "Homer",
<<<<<<< HEAD
  };
  /* 
=======
    NoOfTrips : 9
  }
/* 
>>>>>>> 42c25e4 (replaced css with bootstrap)
  useEffect(()=>{
    /* global google 
// this is for future use with OAuth and React Hooks
  }, []); */

  searchHandler = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
<<<<<<< HEAD
      <div className="App">
<<<<<<< HEAD
        <ExploreView></ExploreView>
        <NavBar />
      </div>
    );
  }
=======
  <div className="container">
=======
      <div className="App classname='justify-content-center mt-3 mb-3'">
  <div className="container justify-content-center mt-3 mb-3">
>>>>>>> 1c6f7fd (database connection successful)

  <Testing/>
  
     </div>
     </div>
  );
}
>>>>>>> 42c25e4 (replaced css with bootstrap)
}

export default App;
