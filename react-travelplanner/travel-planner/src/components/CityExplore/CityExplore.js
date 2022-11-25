import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./CityExplore.css";
import CityContainer from "../CityContainer/CityContainer";
//import { cities } from "../../data/cities.js";
import { db } from '../../FireBaseInit';
import {
  addDoc,
  serverTimestamp, collection, getDocs, onSnapshot, where, setLoading,
  doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";
import { async } from "@firebase/util";

const citiesRef = collection(db, "cities");
//const sightsRef = collection(db, "sights");

function makeNewRand() { return (Math.floor(Math.random() * 10)) };
let randNumbers = [];



/**///////////////////////////////////////////////// */

class CityExplore extends Component {
  state = {
    //sights: [];
    currentRand: undefined,
    newRand: undefined,
    displayCities: [],
    cityData: [],
    searchValue:'',
  }

  cityData = [];

  randArray = () => {
    while (randNumbers.length < 4) {
      let newRandom = makeNewRand();
      if (randNumbers.includes(newRandom)) { makeNewRand(); }
      else {
        this.setState({ currentRand: newRandom });
        randNumbers.push(newRandom);
      }
    }
  }

  /*   randomCities = () => {
      let displayCities = [];
      if (randNumbers !== []) {
        for (var i of randNumbers) {
          displayCities.push(this.state.cityData[i])
        }
  
      } console.log(displayCities);
      this.setState({ displayCities: displayCities });
    } */

  //const sightsDocs = await getDocs(query(sightsRef, where("cityName", "==", city)));

  ratingStars = (r) => {
    let grade = '';
    let i = 0;
    while (i < r) {
      grade += 'grade';
      i++;
    }
    return (grade);
  }

  /*   handleplanCityTrip = (cityname) => {
      console.log(cityname);
      localStorage.clear();
      let city = {
        "SelectedCity": cityname
      }
      localStorage.setItem('city', JSON.stringify(city));
    } */


  componentDidMount = async () => {
    const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.docs.forEach((city) => {
      this.cityData.push(city.data());
    });
    this.setState({
      cityData: this.cityData,
    });

    this.setState({ currentRand: makeNewRand() });
    this.randArray();
    // this.randomCities();

  };

  searchHandler = (e) => {
    this.setState({ searchValue: e.target.value });
    
  };

  /*  let url = 'http://localhost:8080/cities/descriptions/helsinki';
   let opts = {'mode': 'no-cors'}
   fetch(url, opts)
   .then((response) => {
     console.log(response)}); }*/

  render() {
   const cityArray =this.state.cityData.filter(city => 
    city.cityName?.trim().toUpperCase().includes(this.state.searchValue.trim().toUpperCase())
    ).map((city) => {
    return (<CityContainer
      // planCityTrip={() => this.handleplanCityTrip(city.cityName)}
      key={city.cityName}
      cityName={city.cityName.charAt(0).toUpperCase() + city.cityName.substring(1)}
      description={city.description}
      rating={this.ratingStars(city.rating)}
      searchresult ='Search result'
    />
    );
  });

    return (
      <>
      <SearchBar searchEvent={this.searchHandler} />
        <h2>Top Places</h2>
        <div className="city-explore">{cityArray.length > 0 ? cityArray : <h2>Your search did return any City, Please try again</h2>}</div>
      </>
    );
  }
}

export default CityExplore;
