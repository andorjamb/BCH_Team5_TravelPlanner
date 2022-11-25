import React, { useState, useEffect } from "react";
import { UserAuth } from "../Context/Context";
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  serverTimestamp, collection, getDocs, onSnapshot, where, setLoading,
  doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";

import RecentTrips from "../../views/RecentTrips/RecentTrips";
import NextTripList from "../../views/NextTripList/NextTripList";
import UpcomingTrips from "../../components/UpcomingTrips/UpcomingTrips";
import WelcomeUser from "../WelcomeUser/WelcomeUser";
import { db } from '../../FireBaseInit';
import "./Account.css";

const userTripsArray = [];

const Account = () => {
  const { logOut, user } = UserAuth();
  const owner = user ? user.uid : 'unknown';
  const ref = collection(db, 'myplan')

  console.log(user.uid);


  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };


};

export default Account;
