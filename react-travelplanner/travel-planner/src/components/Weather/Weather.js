

import { db } from "../../FireBaseInit";
import React from 'react';
import './Weather.css'
import {
    collection,
    get,
    getDoc,
    doc
} from "@firebase/firestore";
const APIKey = process.env.REACT_APP_WEATHER_API_KEY;

/* const city = 'helsinki';
fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=400&explaintext&titles=Helsinki&format=json')
    .then((response) => response.json())
    .then((data) => console.log(data)); */


const Weather = () => {


    const sightRef = doc(db, 'sights', 'ChIJ-1ZkcY4LkkYRsDmSuVO1AAo');
    const docSnap = getDoc(sightRef);

    return (
        <div className="weather">
            <h3>Testing</h3>
            <p>{docSnap[0]}</p>
        </div>
    );
};

export default Weather;
