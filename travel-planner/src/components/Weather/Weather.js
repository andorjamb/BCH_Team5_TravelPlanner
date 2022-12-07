
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'


const Weather = ({ cityName }) => {
    const APIKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const [weatherData, setWeatherData] = useState([]);
    class WeatherObject {
        constructor(description, iconCode, temp_min, temp_max) {
            this.description = description;
            this.iconCode = iconCode;
            this.temp_min = temp_min;
            this.temp_max = temp_max;
        }
    }

    var dt = new Date(1670228039000);
    //eg 1485789600 * 1000
    console.log(dt.toDateString());


    useEffect(() => {
        console.log(APIKey);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIKey}`)
            .then((res) => {
                setWeatherData(new WeatherObject(res.data.weather[0].description, res.data.weather[0].icon, res.data.main.temp_min.toFixed(), res.data.main.temp_max.toFixed()))
            })
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
            <p>{weatherData.temp_max} &#8451;</p>
        </div>
        <div><button className="nextForecast">chevron_right</button></div>
    </div>)

}


export default Weather;  