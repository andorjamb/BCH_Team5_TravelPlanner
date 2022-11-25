
import React, { Component } from 'react';
import './Weather.css'
/* import {
    collection,
    get,
    getDocs,
    doc
} from "firebase/firestore";
import { db } from '../../FireBaseInit'
const APIKey = process.env.REACT_APP_WEATHER_API_KEY; */

//const city = 'helsinki';
/* fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=400&explaintext&titles=Helsinki&format=json')
    .then((response) => response.json())
    .then((data) => console.log(data)); */


class Weather extends Component {
    state = {
        weather: '',
        isLoading: true,
        cityName: ''
    }
    componentDidMount = async () => {
        /*    const citiesSnapshot = await getDocs(collection(db, "cities"));
           citiesSnapshot.forEach((doc) => { console.log(doc.id) }); */

        fetch(`http://localhost:8080/weather/{this.state.cityName}`)
            .then((response) => response.json())
            .then((data) => { this.setState({ weather: data }); console.log(data) })
            .catch(error => console.log(error));
    }

    render() {

        if (this.state.isLoading === true) {
            return (
                <p>Loading....</p>
            )
        }
        return (
            <div className="weather">
                <div>{this.state.cityName} {this.state.weather}</div>
            </div>
        )
    }

}
export default Weather;  