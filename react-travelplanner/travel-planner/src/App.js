import React from "react";
import "./App.css";
import ExploreView from "./views/Explore/ExploreView";
import NavBar from "./components/NavBar/NavBar";
import FlightView from "./views/Flight/FlightView";
import PlannerView from "./views/Planner/PlannerView";
import ProfileView from "./views/Profile/ProfileView";
import Account from "./components/Account/Account";
import SignIn from "./components/SignIn/SignIn";
import NotFound from "./views/NotFound/NotFound"
import { AuthContextProvider } from "./components/Context/Context"
import { Route, Routes } from 'react-router-dom';
import Experiments from './views/Experiments/Experiments';
import SecureAccess from "./adminActions/SecureAccess";


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
          {/* require sidned in user  */}
          <Route path='/profile/account' element={<SecureAccess>
            <Account /></SecureAccess>}></Route>

          <Route path='/experiments' element={<Experiments />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </AuthContextProvider>

    </div>
  )

}

export default App;
