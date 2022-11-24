import React, { Component, createElement } from "react";
import "./CityExplore.css";
import CityContainer from "../CityContainer/CityContainer";
import {cities} from "../../data/cities.js";
import { db } from '../../FireBaseInit';
import {
  addDoc,
  serverTimestamp, collection, getDocs, onSnapshot, where, setLoading,
  doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";

let cityName;

const urls = [`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=400&explaintext&titles=${cityName}`, ``]


class CityExplore extends Component {
  state = {
    cities: cities,
  }

ratingStars = (r)=>{
  let grade= '';
  let i = 0;
  while (i<r){
    grade = grade + 'grade';
    i++;
  }
  return(grade)

   } 

 handleplanCityTrip = (cityname)=>{
  console.log(cityname);
  localStorage.clear();
  let city ={
    "SelectedCity":cityname
  }
  localStorage.setItem('city',JSON.stringify(city));
}
  
/*   
  componentDidMount(){

    let url = 'http://localhost:8080/cities/descriptions/helsinki';
    let opts = {'mode': 'no-cors'}
    fetch(url, opts)
    .then((response) => {
      console.log(response)});
  }
 */
  render() {
    const cityArray = this.state.cities.map((city) => {
      return (<CityContainer
        planCityTrip = {() => this.handleplanCityTrip(city.name)}
          key={city.name}
          cityName={city.name.charAt(0).toUpperCase() + city.name.substring(1)}
          description={city.description}
          rating={this.ratingStars(city.rating)}

        />
      );
    });

    return (
      <>
        <h2>Top Places</h2>
        <div className="city-explore">{cityArray}</div>
      </>
    );
  }
}

export default CityExplore;
