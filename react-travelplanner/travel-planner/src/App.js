import React from "react";
import "./App.css";
import ExploreView from "./views/Explore/ExploreView";

import NavBar from "./components/NavBar/NavBar";

import FlightView from "./views/Flight/FlightView";
import PlannerView from "./views/Planner/PlannerView";
import ProfileView from "./views/Profile/ProfileView";
import Account from "./components/Account/Account";
import SignIn from "./components/SignIn/SignIn";
import { AuthContextProvider } from "./components/Context/Context"
import { Route, Routes } from 'react-router-dom';


// const {user} = UserAuth();


const App = () => {
  return (
    <div>

      <NavBar />
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<ExploreView />}>Home</Route>
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
