import React from "react";
import { Route, Routes, useParams } from 'react-router-dom';
import { AuthContextProvider } from "./components/Context/Context"

import ExploreView from "./views/Explore/ExploreView";
import CityView from "./views/City/CityView";
import NavBar from "./components/NavBar/NavBar";
import FlightView from "./views/Flight/FlightView";
import PlannerView from "./views/Planner/PlannerView";
import ProfileView from "./views/Profile/ProfileView";
import Account from "./components/Account/Account";
import SignIn from "./components/SignIn/SignIn";
import NotFound from "./views/NotFound/NotFound"
import Experiments from './views/Experiments/Experiments';
import SecureAccess from "./adminActions/SecureAccess";

import "./App.css";

// const {user} = UserAuth();


const App = () => {
  return (
    <div className="App">

      <NavBar />
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<ExploreView />}>Home</Route>
          <Route path='/flight' element={<FlightView />}>Flight</Route>
          <Route path='/planner' element={<PlannerView />}>Planner</Route>
          <Route path='/profile/signin' element={<SignIn />}>SignIn</Route>
          <Route path='/profile' element={<ProfileView />}></Route>
          {/* require signed in user  */}
          <Route path='/profile/account' element={<SecureAccess>
          <Account /></SecureAccess>}></Route>
          <Route path='/:cityname' element={<CityView />}></Route>

          <Route path='/experiments' element={<Experiments />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </AuthContextProvider>

    </div>
  )

}

export default App;
