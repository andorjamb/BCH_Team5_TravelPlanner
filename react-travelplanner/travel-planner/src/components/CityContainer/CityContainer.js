import  React from 'react';
import Rating from '../Rating/Rating'
import "./CityContainer.css";


const CityContainer = ({planCityTrip, cityName, rating}) => {
  return (
    <div className="city-container" onClick={planCityTrip}>
      <div className="city-img">
        <img
          src={`https://source.unsplash.com/500x400/?${cityName}`}
          alt="city img"
        />
      </div>
      <div className="city-info">
        <h3 className="city-name">{cityName}</h3>
        {/* <p>{props.sights}</p> */}
        <Rating rating={rating} />
      </div>
    </div>
  );
};

export default CityContainer;
