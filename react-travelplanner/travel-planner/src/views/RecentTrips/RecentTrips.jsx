import React from "react";
import './RecentTrips.css';
import { useContext, createContext, useEffect, useState } from "react";

const RecentTrips = (props) => {
  return (
    <div className="recentTripContainer">
      <div className="tripImage"> 
        <img  src={`${props.imageUrl}.svg`} alt={props.imageUrl} />
      </div>
      <div className="tripdetails">
        <h3 className="tripname">{props.name}</h3>
        <p>visited : {props.date}</p>
        <div><img src={`${props.rating}.svg`} alt={props.rating} /></div>
      </div>
      
 
    </div>
  );
};

export default RecentTrips;
