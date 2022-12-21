import React from "react";
import "./SightList.css";

const SavedPlaces = (props) => {
  return (
    <div className="saved-places">
      <img src={`https://source.unsplash.com/500x400/?${props.sightName}`} alt="" />
      <span className="saved-places-name">{props.sightName}</span>
      <span
        className="material-symbols-outlined add"
        onClick={() => {props.addTrip(props.sightName, props.cityName)}}
      >
        add_circle
      </span>
    </div>
  );
};

export default SavedPlaces;
