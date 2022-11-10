import React, {Component } from "react";
import "./App.css";
import ExploreView from "./views/Explore/ExploreView";

import NavBar from "./components/NavBar/NavBar";

import FlightView from "./views/Flight/FlightView";
import PlannerView from "./views/Planner/PlannerView";
import ProfileView from "./views/Profile/ProfileView";
import Account from "./views/Profile/Account";
import SignIn from "./views/Profile/SignIn";
// import {UserAuth} from './views/Profile/Context/Context'

 import {AuthContextProvider} from "./views/Profile/Context/Context"


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
