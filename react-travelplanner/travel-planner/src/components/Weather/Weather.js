

import { db } from "../../FireBaseInit";
import React, { useState, useEffect } from 'react';
import './Weather.css'
import {
    collection,
    get,
    getDoc,
    doc
} from "firebase/firestore";
const APIKey = process.env.REACT_APP_WEATHER_API_KEY;

/* const city = 'helsinki';
fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=400&explaintext&titles=Helsinki&format=json')
    .then((response) => response.json())
    .then((data) => console.log(data)); */
//let response;

const Weather = (props) => {

    const sightRef = doc(db, 'sights', 'ChIJ-1ZkcY4LkkYRsDmSuVO1AAo');//Suomenlinna id
    const docSnap = getDoc(sightRef);
    useEffect(() => {
        //
    }, [])
    return (
        <><h3>Testing</h3>
            <div className="weather">

                <p>{docSnap[0]}</p>



            </div>
            <button onClick={props.clickHandler}>Get Data from server</button>
            <button onClick={props.clickHandler2}>Get data from Firebase</button>
            <p>Data fetched from express backend: {props.response}</p>
            <p>Data fetched from firestore backend: {props.response2}</p>

        </>

    );
};

export default Weather;
