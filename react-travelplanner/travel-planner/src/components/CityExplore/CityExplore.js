import React, { Component } from "react";
import "./CityExplore.css";
import CityContainer from "../CityContainer/CityContainer";
import {cities} from "../../data/cities.js";

class CityExplore extends Component {
  state = {
    cities: cities,
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
          rating={city.rating}

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
