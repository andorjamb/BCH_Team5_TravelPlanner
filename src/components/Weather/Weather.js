
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'


const Weather = ({ cityName }) => {
    const APIKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const [weatherData, setWeatherData] = useState([]);
    /*  const [coords, setCoords] = useState({ lat: 0, lon: 0 }); */
    /*  const [weatherDate, setWeatherDate] = useState(0) */

    /* TODO: forecast button functionality */
    /*  const nextDateClickHandler = () => {//show next date's weather
         console.log('weather arrow clicked');
         setWeatherDate(weatherDate => weatherDate + 1);
     } */


    class WeatherObject {
        constructor(description, iconCode, temp_min, temp_max, date) {
            this.description = description;
            this.iconCode = iconCode;
            this.temp_min = temp_min;
            this.temp_max = temp_max;
            this.date = date;
        }
    }

    //if coords needed, first convert cityname to coords
    /*    useEffect(() => {
           axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},FI&limit=1&appid=${APIKey}`)
               .then((res) => {
                   console.log('lat:', res.data.lat, 'lon:', res.data.lon)
                   setCoords({ lat: res.data.lat, lon: res.data.lon });
                   console.log('city coords:', res.data.lat, res.data.lon);
               })
   ß
       }, []) */

    useEffect(() => {
        const formatDate = (date) => { return new Date(date * 1000).toDateString() };
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIKey}`)
            .then((res) => {
                setWeatherData(new WeatherObject(res.data.weather[0].description, res.data.weather[0].icon, res.data.main.temp_min.toFixed(), res.data.main.temp_max.toFixed(), formatDate(res.data.dt)))
            })


            .catch(error => console.log(error));
    }, []);



    return (<div className="weather" >
        <div>
            <img src={`http://openweathermap.org/img/wn/${weatherData.iconCode}@2x.png`}
                alt="weather icon">
            </img>
        </div>
        <div className="weatherElement">
            <p id="weatherDate">{weatherData.date}</p>
            <p>{weatherData.description}</p>
            <p>{weatherData.temp_min} &#8451; -  {weatherData.temp_max} &#8451;</p>
        </div>
        <div><button className="nextForecast" /* onClick={nextDateClickHandler} */>chevron_right</button></div>
    </div>)

}

export default Weather;  