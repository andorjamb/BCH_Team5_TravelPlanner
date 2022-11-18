
const express = require('express');
const cors = require('cors');
const APIKey = process.env.REACT_APP_WEATHER_API_KEY;

const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';

//const city = 'helsinki';

const expressServer = express();
expressServer.use(cors());

expressServer.get('/', (req, res) => {

    res.send("Hi");
}
);


expressServer.listen(port, host, () => console.log('server is listening on port', port))

/* `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next5days?key=${APIKey}`,
 */