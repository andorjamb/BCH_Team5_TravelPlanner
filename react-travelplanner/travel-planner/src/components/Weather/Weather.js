//import 'cities' from '../../data/cities';
/* const weatherEndpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next5days?key=${APIKey}` */
import React from 'react';
import {
    collection,
    get,
    getDocs,
    doc,
    db,
} from "@firebase/firestore";
const APIKey = process.env.REACT_APP_WEATHER_API_KEY;

const citiesSnapshot = db.collection('cities').get();
citiesSnapshot.forEach((doc) => { console.log(doc.id) });

async function requests() {
    citiesSnapshot.map((city) => {
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next5days?key=${APIKey}`)
    })
}

const responses = await requests();

const data = responses.json();

const Weather = () => {


    return (
        <div className="weather">
            {data}
        </div>
    );
};



export default Weather;