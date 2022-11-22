
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
const { getCities} = require('./serverAPI.js');
/* const admin = require('firebase-admin'); */
const db = require('./db'); 


const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';

const expressServer = express();
expressServer.use(cors({
  origin: '*'
}));

/* 
admin.initializeApp( {
  credential: admin.credential.cert(firebaseKey),
  databaseURL: "https://api-project-32470662412-default-rtdb.europe-west1.firebasedatabase.app"
} );
const db = admin.firestore();  */

const city = 'helsinki';


async function getWeather(city) {
  let queryUrl = new URL(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next5days?key=${APIKey}`);
  let result = await axios.get(queryUrl,
    { responseType: "json" });
  console.log(result);
  return result;
}

expressServer.get('/', (req, res) => {
  res.send("Hello from your server")})

expressServer.get(`/weather/${city}`, (req, res) => {
  (async function(){ await getWeather(city)
  .then(console.log(req.params))
  .then(res.send(weather));
})();
})



expressServer.get('/cities/descriptions/helsinki', (req,res)=> {
  (async=()=>{
    try {
         axios.get('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=400&explaintext&titles=Helsinki&format=json')
        .then((response)=>response.data)
        .then((data)=>{console.log(data)})
        .then((data)=>res.send(data));
    
        }
        catch (error) {
                    return res.status(500).send(error);
                }
            })()
           })


expressServer.get(`/cities`, (req,res)=> {
  (async=()=>{
    try {
         let response = [];
         const cities =  db.collection('cities').get()
         .then(snapshot=> {
             snapshot.forEach((city) => {response.push(city.data());
             });
             console.log(response);
             res.send(response);
             });
 }
 catch (error) {
             return res.status(500).send(error);
         }
     })()
    })


expressServer.listen(port, host, () => console.log('server is listening on port', port))
