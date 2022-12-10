import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating'
import Weather from "../Weather/Weather"
import "./CityContainer.css";


const CityContainer = ({ cityName, rating, sights }) => {

  const imageSrc = `https://source.unsplash.com/500x400/?${cityName}`;

  /* const sightsList = () => {
    let list = sights.filter((sight) => sight.cityName === { cityName });
    let listItems = list.map((sight) => (<li key={sight.sightName}>{sight.sightName}</li>));
    return (<ul>{listItems}</ul>)
  } */  //FIX: this isn't working (doing nothing)

  return (
    <div className="city-container" >
      <div className="city-img">
        <img src={imageSrc} alt="city img" />
      </div>
      <div className="city-info">
        <h3 className="city-name">{cityName}</h3>
        {/*   {sightsList} */}

        <Rating rating={rating} />
        <Weather cityName={cityName} />
        <Link to={`/explore/${cityName}`}>See More</Link>
      </div>
    </div>
  );
};

export default CityContainer;
