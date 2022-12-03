
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'
//sconst APIKey = process.env.REACT_APP_WEATHER_API_KEY;
const APIKey = "6f830172b6d7108b4a5dfcff5c0ca21a";
//const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

const Weather = ({ cityName }) => {

    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState([]);

    let holder;

    class WeatherObject {
        constructor(description, iconCode, temp_min, temp_max) {
            this.description = description;
            this.iconCode = iconCode;
            this.temp_min = temp_min;
            this.temp_max = temp_max;
        }
    }

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIKey}`)
            .then((res) => { setWeatherData(new WeatherObject(res.data.weather[0].description, res.data.weather[0].icon, res.data.main.temp_min, res.data.main.temp_max)) })
            .then((res) => console.log(weatherData))
            .catch(error => console.log(error));
    }, []);

    return (<div className="weather">
        <img src={`http://openweathermap.org/img/wn/${weatherData.iconCode}@2x.png`} alt="weather icon"></img>

        <p className="weatherElement"> {weatherData.description}</p>
        <p className="weatherElement">min: {weatherData.temp_min} &#8451; </p>
        <p className="weatherElement"> max: {weatherData.temp_max}&#8451;</p>

    </div>)

}


export default Weather;  