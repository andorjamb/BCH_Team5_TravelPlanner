import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { db } from '../../FireBaseInit';
import {
  addDoc,
  serverTimestamp, collection, getDocs, onSnapshot, where, setLoading,
  doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";
import { async } from "@firebase/util";

import SearchBar from "../SearchBar/SearchBar";
import CityContainer from "../CityContainer/CityContainer";

import "./CityExplore.css";

const citiesRef = collection(db, "cities");
//const sightsRef = collection(db, "sights");

function makeNewRand(factor) { return (Math.floor(Math.random() * factor)) };

/**///////////////////////////////////////////////// */

class CityExplore extends Component {
  state = {
    //sights: [];
    cityData: [],
    searchValue: '',
    loading: false,
    displayCities: [],
  }

  cityData = [];
  displayCities = [];

  //const sightsDocs = await getDocs(query(sightsRef, where("cityName", "==", city)));

  getRandArray() {
    let randNumbers = [];
    while (randNumbers.length < 4) {
      let newRandom = makeNewRand(11);
      if (randNumbers.includes(newRandom)) { makeNewRand(11) }
      else { randNumbers.push(newRandom); }
    }
    return randNumbers;
  }

  ratingStars = (r) => {
    let grade = '';
    let i = 0;
    while (i < r) {
      grade += 'grade';
      i++;
    }
    return (grade);
  }

  handleplanCityTrip = (cityname) => {
      console.log(cityname);
      localStorage.clear();
      let city = {
        "SelectedCity": cityname
      }
      localStorage.setItem('city', JSON.stringify(city));
    } 
 
  searchHandler = (e) => {
    this.setState({ searchValue: e.target.value });
    console.log(this.state.searchValue);
    let cityFilter = this.state.cityData.filter(city =>
      city.cityName.includes(this.state.searchValue.trim().toLowerCase())
    );
    this.setState({ displayCities: cityFilter })

  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.docs.forEach((city) => {
      this.cityData.push(city.data());
    });
    this.setState({ cityData: this.cityData });
    this.setState({ loading: false });
    let randNumbers = this.getRandArray();
    this.displayCities = this.cityData.filter((city) => randNumbers.includes(this.cityData.indexOf(city)));
    this.setState({ displayCities: this.displayCities });

  }

  render() {

    let cityArray = this.state.displayCities.map((city) => {
      return (   <Link to={`/explore/${city.cityName}`}><CityContainer
        planCityTrip={() => this.handleplanCityTrip(city.cityName)}
        key={city.cityName}
        cityName={city.cityName.charAt(0).toUpperCase() + city.cityName.substring(1)}
        rating={this.ratingStars(city.rating)}
        searchresult='Search result'
      /></Link>
      );
    });


    return (
      <>
        <SearchBar searchEvent={this.searchHandler} />
  
        <div className="city-explore">
                <h2>Top Places</h2>
          {cityArray}</div>
      </>
    );
  }

}

export default CityExplore;
