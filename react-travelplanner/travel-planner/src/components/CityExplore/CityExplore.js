import React, { Component } from "react";
import "./CityExplore.css";
import CityContainer from "../CityContainer/CityContainer";
import { cities } from "../../data/cities.js";

class CityExplore extends Component {
  state = {
    cities: cities,
  };

  render() {
    const cityArray = this.state.cities.map((city) => {
      return (
        <CityContainer
          cityName={city.name.charAt(0).toUpperCase() + city.name.substring(1)}
          description={city.description}
          rating={city.rating}
        />
      );
    });

    return (
      <div>
        <h2>Top Places</h2>
        <div className="city-explore">{cityArray}</div>
      </div>
    );
  }
}

export default CityExplore;
