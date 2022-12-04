/* import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import CityContainer from "../CityContainer/CityContainer";

import "./CityExplore.css";

const CityExplore = ({ displayArray }) => {

  useEffect(() => {

    const cityArray = displayArray.map((city) => {
      return (<Link to={`/explore/${city.cityName}`}>
        <CityContainer
          key={city.cityName}
          cityName={city.cityName.charAt(0).toUpperCase() + city.cityName.substring(1)}
          rating={city.rating}
        /></Link>
      );
    });

  }, [displayArray])

  return (
    <>
      <div className="city-explore">
        <h2>Top Places</h2>
        {/*   {cityArray.length > 0 ? cityArray :
          <h3>No Record to display currently, try searching a different city</h3>
        } */
/*}</div>
</>
);


}

export default CityExplore;
*/