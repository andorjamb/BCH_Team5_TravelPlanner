
import React, {useState, useEffect} from 'react';
import './Weather.css'
import {
    collection,
    get,
    getDocs,
    doc
} from "firebase/firestore";
import { db } from '../../FireBaseInit'
const APIKey = process.env.REACT_APP_WEATHER_API_KEY;



const citiesSnapshot = db.collection('cities').get;
citiesSnapshot.forEach((doc) => { console.log(doc.id) });
/**`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next5days?key=${APIKey}` */

//test with city description
const city = 'helsinki';
fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=400&explaintext&titles=Helsinki&format=json')
    .then((response) => response.json())
    .then((data) => console.log(data));

    //test fetching from server
fetch('http://localhost:8080`/weather/{city}')
.then((response) => response.json())
.then((data) => console.log(data));

const Weather = () => {
const[weather, getWeather]= useState("");


    return (
        <div className="weather">
            <div></div>
        </div>
    );
};

export default Weather; 