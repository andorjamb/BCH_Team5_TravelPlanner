
const express = require('express');
const cors = require('cors');
const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
const axios = require('axios');

const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';

const city = { cityName: 'helsinki' };
const expressServer = express();
expressServer.use(cors({
  origin: '*'
}));

async function getWeather(city){
    let result = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next5days?key=8WZRHWN5ZRVL5C9375RBFJZFJ`, 
    { responseType: "json" });
      console.log(result);
      return result;
    }
expressServer.get(`/weather/${city}`, (req, res) => {
    let weather = getWeather(city);
    res.send(weather);
      });
  


expressServer.listen(port, host, () => console.log('server is listening on port', port))

/* `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next5days?key=${APIKey}`,
 */