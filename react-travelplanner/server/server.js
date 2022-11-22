
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
const admin = require('firebase-admin')
const firebaseKey = require('./firebaseKey.json');

const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';

const city = { cityName: 'helsinki' };
const expressServer = express();
expressServer.use(cors({
  origin: '*'
}));

async function getWeather(city) {
  let queryUrl = new URL(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next5days?key=${APIKey}`);
  let result = await axios.get(queryUrl,
    { responseType: "json" });
  console.log(result);
  return result;
}
expressServer.get(`/weather/${city}`, (req, res) => {
  getWeather(city);
  res.send(weather);
});

expressServer.listen(port, host, () => console.log('server is listening on port', port))
