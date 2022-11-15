
import React from 'react';
import './Weather.css'
import {
    collection,
    get,
    getDocs,
    doc,
    getFirestore,
} from "@firebase/firestore";
const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
/*

const db = getFirestore();

const citiesSnapshot = db.collection('cities').get;
citiesSnapshot.forEach((doc) => { console.log(doc.id) });*/
/**`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next5days?key=${APIKey}` */


const city = 'helsinki';
fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=400&explaintext&titles=Helsinki&format=json')
    .then((response) => response.json())
    .then((data) => console.log(data));


const Weather = () => {


    return (
        <div className="weather">
            <p>some writing here</p>
        </div>
    );
};

export default Weather; 