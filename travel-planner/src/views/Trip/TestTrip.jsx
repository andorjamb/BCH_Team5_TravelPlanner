import React from "react";
import "./TestTrip.css";

const TestTrip = (props) => {
  let city = [];
  props.sights.forEach((a) => {
    city.push(a.cityName);
  });
  // filter dublicate city names:
  let cityFilter = [...new Set(city)];

  return (
    <div className="testtrip">
      <div>
        <img src={`https://source.unsplash.com/500x400/?${cityFilter[0]}`} alt="" />
      </div>
      <div className="content">
        <h2>{props.tripName}</h2>
        <p>Trip date: {props.tripDate}</p>
        <p>Sights: {props.sights.length}</p>
        <p>City: {cityFilter.join(", ")}</p>
      </div>
    </div>
  );
};

export default TestTrip;
