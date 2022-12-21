import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating'
import Weather from "../Weather/Weather"
import "./CityContainer.css";


const CityContainer = ({ cityName, rating }) => {

  const imageSrc = `https://source.unsplash.com/500x400/?${cityName}`;

  return (
    <div className="city-container" >
      <div className="city-img">
        <img src={imageSrc} alt="city img" />
      </div>
      <div className="city-info">
        <h3 className="city-name">{cityName}</h3>
        <Rating rating={rating} />
        <Weather cityName={cityName} />
        <Link to={`/explore/${cityName}`}>See More</Link>
      </div>
    </div>
  );
};

export default CityContainer;
