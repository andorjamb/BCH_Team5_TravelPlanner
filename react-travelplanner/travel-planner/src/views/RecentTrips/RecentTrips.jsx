import React from "react";
import './RecentTrips.css';
import { useContext, createContext, useEffect, useState } from "react";

const RecentTrips = (props) => {
  return (
    <div className="recentTripContainer">
      <div className="tripImage"> 
        <img  src={`${props.name}.svg`} alt={props.imageUrl} />
      </div>
      <div className="tripdetails">
        <h3 className="tripname">{props.name}</h3>
        <p>{props.sights}</p>
        <p>visited : {props.date}</p>
        <div><img src={`4.svg`} alt={props.rating} /></div>
      </div>
      
 
    </div>
  );
};

export default RecentTrips;
