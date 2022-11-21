import React from "react";
import "./SavedPlaces.css";

const SavedPlaces = (props) => {
  return (
    <div className="saved-places">
      <img src={`https://source.unsplash.com/500x400/?${props.name}`} alt="" />
      <span className="saved-places-name">{props.name}</span>
      <span className="material-symbols-outlined add">add_circle</span>
    </div>
  );
};

export default SavedPlaces;
