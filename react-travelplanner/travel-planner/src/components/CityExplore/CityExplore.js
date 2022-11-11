import React, { Component } from "react";
import "./CityExplore.css";
import CityContainer from "../CityContainer/CityContainer";
import { cities } from "../../data/cities.js";

class CityExplore extends Component {
  state = {
    cities: cities,
  };

//  componentDidMount() //fetch from api, insert into object (wait for data from db first)


  render() {
    const cityArray = this.state.cities.map((city) => {
      return (
        <CityContainer
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
