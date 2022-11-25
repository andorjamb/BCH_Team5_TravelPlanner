import React from "react";
import './RecentTrips.css';
import { useContext, createContext, useEffect, useState } from "react";
//ff
const RecentTrips = (props) => {
  return (
    <div className="trip-component-box">
      <div className="trip-image">
        <img src={`${props.name}.svg`} alt={props.name} />
      </div>
      <div className="trip-details">
        <h3 className="trip-name">{props.name}</h3>
        <ol className="sights-list">{props.sightsList}</ol>
        <p>visited : {props.date}</p>
        <div><img src={`4.svg`} alt={props.rating} /></div>
      </div>


    </div>
  );
};

export default RecentTrips;
