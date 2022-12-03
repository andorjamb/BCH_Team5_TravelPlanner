
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'
//sconst APIKey = process.env.REACT_APP_WEATHER_API_KEY;
const APIKey = "6f830172b6d7108b4a5dfcff5c0ca21a";
//const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

const Weather = ({ cityName }) => {
    const [weatherData, setWeatherData] = useState([]);

    class WeatherObject {
        constructor(description, iconCode, temp_min, temp_max) {
            this.description = description;
            this.iconCode = iconCode;
            this.temp_min = temp_min;
            this.temp_max = temp_max;
        }
    }

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIKey}`)
            .then((res) => { 
                setWeatherData(new WeatherObject(res.data.weather[0].description, res.data.weather[0].icon, res.data.main.temp_min, res.data.main.temp_max)) })
            .then((res) => console.log(weatherData))
            .catch(error => console.log(error));
    }, []);

    return (<div className="weather">
        <div>
            <img src={`http://openweathermap.org/img/wn/${weatherData.iconCode}@2x.png`} 
            alt="weather icon">
            </img>
        </div>
        <div className="weatherElement">
            <p>{weatherData.description}</p>
            <p>{weatherData.temp_min} &#8451;</p>
            <p>{weatherData.temp_max}&#8451;</p>
       </div>
    </div>)

}


export default Weather;  