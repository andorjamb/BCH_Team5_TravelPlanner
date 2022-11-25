import React from "react";
import "./Trip.css";

const Trip = (props) => {
  return (
    <div className="trip">
      <div className="trip-title">
        <div className="trip-index">{props.index}</div>
        <div>
          <h3>{props.sightName}</h3>
          <h4>{props.cityName}</h4>
        </div>
      </div>
      <div className="trip-img">
        <img src={`https://source.unsplash.com/500x400/?${props.sightName}`} alt="" />
      </div>
    </div>
  );
};

export default Trip;
