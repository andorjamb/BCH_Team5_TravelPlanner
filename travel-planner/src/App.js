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
import SecureAccess from "./adminActions/SecureAccess";
import ThankYou from "./components/ThankYou/ThankYou";

// Admin menu

import NewCity from "./adminActions/AddCity";

import "./App.css";
import AdminMenu from "./adminActions/AdminMenu";
import AddCityTripPlaces from "./adminActions/AddCityTripPlaces";
import ManageUsers from "./adminActions/ManageUsers";
import TestRealtimeFirebase from "./adminActions/TestRealtimeFirebase";

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
          <Route path='/thankyou' element={<ThankYou />}></Route>
          <Route path='/admin' element={<AdminMenu />}>Admin</Route>
          <Route path="/admin/addcity" element={<NewCity/>}>Add City</Route>
          <Route path="/admin/addsights" element = {<AddCityTripPlaces/>}>Add Sights</Route>
          <Route path="/admin/manageuser" element={<ManageUsers></ManageUsers>} >Manage Users</Route>
          <Route path="/admin/tests" element={<TestRealtimeFirebase/>}>running test page</Route>
          {/* require signed in user  */}

          <Route path='/profile/account' element={<SecureAccess>
            <Account /></SecureAccess>}></Route>
          <Route path='/explore/:cityname' element={<CityView />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </AuthContextProvider>

    </div>
  )
}

export default App;
