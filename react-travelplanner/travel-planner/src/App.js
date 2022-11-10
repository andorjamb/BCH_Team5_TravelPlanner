import React, {Component } from "react";
import "./App.css";
import ExploreView from "./views/Explore/ExploreView";

import NavBar from "./components/NavBar/NavBar";

import FlightView from "./views/Flight/FlightView";
import PlannerView from "./views/Planner/PlannerView";
import ProfileView from "./views/Profile/ProfileView";
import Account from "./components/Account/Account";
import SignIn from "./components/SignIn/SignIn";
// import {UserAuth} from './views/Profile/Context/Context'


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

 import {AuthContextProvider} from "./views/Profile/Context/Context"




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

import { Route, Routes } from 'react-router-dom';

// const {user} = UserAuth();

const searchHandler = (e) => {
  this.setState({ search: e.target.value });
};

const App = () => {
  return (
    <div>

      <NavBar />
      <AuthContextProvider>
      <Routes>
        <Route path='/' element={<ExploreView></ExploreView>}>Home</Route>
        <Route path='/flight' element={<FlightView />}>Flight</Route>
        <Route path='/planner' element={<PlannerView />}>Planner</Route>       
        <Route path='/profile/signin' element={<SignIn />}>SignIn</Route>
        <Route path='/profile' element={<ProfileView />}></Route>
        <Route path='/profile/account' element={<Account />}></Route>

      </Routes>
          </AuthContextProvider>

    </div>
  )

}

export default App;
