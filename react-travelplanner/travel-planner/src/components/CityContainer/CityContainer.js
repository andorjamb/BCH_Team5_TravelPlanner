import  React from 'react';
import "./CityContainer.css";


const CityContainer = (props) => {
  return (
    <div className="city-container" onClick={props.planCityTrip}>
      <div className="city-img">
        <img
          src={`https://source.unsplash.com/500x400/?${props.cityName}`}
          alt="city img"
        />
      </div>
      <div className="city-info">
        <h3 className="city-name">{props.cityName}</h3>
        <p>{props.sights}</p>
        <p id="rating">{props.rating}</p>
      </div>
    </div>
  );
};

export default CityContainer;
