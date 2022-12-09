import React, { Component } from "react";
import { db } from '../../FireBaseInit';
import { collection, getDocs } from "@firebase/firestore";

import SearchBar from "../SearchBar/SearchBar";
import CityContainer from "../CityContainer/CityContainer";
import "./CityExplore.css";

function makeNewRand(factor) { return (Math.floor(Math.random() * factor)) };

class CityExplore extends Component {
  state = {
    cityData: [],
    searchValue: '',
    loading: false,
    displayCities: [],
    sightsData: [],
  }
  cityData = [];
  displayCities = [];
sightData = [];

  getRandArray() {
    let randNumbers = [];
    while (randNumbers.length < 4) {
      let newRandom = makeNewRand(11);
      if (randNumbers.includes(newRandom)) { makeNewRand(11) }
      else { randNumbers.push(newRandom); }
    }
    return randNumbers;
  }

  searchHandler = (e) => {
    this.setState({ searchValue: e.target.value });
    console.log(this.state.searchValue);
    let cityFilter = this.state.cityData.filter(city =>
      city.cityName.includes(this.state.searchValue.trim().toLowerCase())
    );
    this.setState({ displayCities: cityFilter })
  };

  async getSights() {
    const sightsSnapshot = await getDocs(collection(db, "sights"));
    sightsSnapshot.docs.forEach((sight) => {
      this.sightData.push(sight.data());
    })
    this.setState({sightData : this.sightData});
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const citySnapshot = await getDocs(collection(db, "cities"));
    citySnapshot.docs.forEach((city) => {
      this.cityData.push(city.data());
    });
    this.setState({ cityData: this.cityData });
    let randNumbers = this.getRandArray();
    this.displayCities = this.cityData.filter((city) => randNumbers.includes(this.cityData.indexOf(city)));
    this.setState({ displayCities: this.displayCities });
    this.getSights();

    this.setState({ loading: false });



  }

  render() {
    let cityArray = this.state.displayCities.map((city) => {
      return (
        <CityContainer
          key={city.cityName}
          cityName={city.cityName.charAt(0).toUpperCase() + city.cityName.substring(1)}
          rating={city.rating}
          searchresult='Search result'
          sights = {this.sightsData}
        
        />
      );
    });
    return (
      <>
        <SearchBar searchEvent={this.searchHandler} />
        <div className="city-explore">
          <h2>Top Places</h2>
          {cityArray.length > 0 ? cityArray :
            <h3>No Record to display currently, try a different city</h3>
          }</div>
      </>
    );
  }
}
export default CityExplore;