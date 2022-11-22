
import React, { useState, useEffect, Component } from 'react';
import './Weather.css'
import {
    collection,
    get,
    getDocs,
    doc
} from "firebase/firestore";
import { db } from '../../FireBaseInit'
const APIKey = process.env.REACT_APP_WEATHER_API_KEY;

/**`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next5days?key=${APIKey}` */


const city = 'helsinki';
fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=400&explaintext&titles=Helsinki&format=json')
    .then((response) => response.json())
    .then((data) => console.log(data));

//test fetching from server


class Weather extends Component {
    state = {
        weather: '',
    }

    componentDidMount = async () => {

        const citiesSnapshot = await getDocs(collection(db, "cities"));
        citiesSnapshot.forEach((doc) => { console.log(doc.id) });

        fetch('http://localhost:8080`/weather/{city}')
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch(error => console.log(error));
    }

    render() {

        return (
            <div className="weather">
                <div></div>
            </div>
        );
    }



}



export default Weather;  