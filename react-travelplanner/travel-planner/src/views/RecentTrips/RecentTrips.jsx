import React from "react";
import { useContext, createContext, useEffect, useState } from "react";

const RecentTrips = (props) => {
  return (
    <div>
      <h2>recent trips</h2>
      <div>
        <p>{props.name}</p>
      </div>
      <p>{props.date}</p>
      <p>{props.imageUrl}</p>
      <p>{props.rating}</p>
    </div>
  );
};

export default RecentTrips;
