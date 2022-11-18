import React from "react";
import "./SavedPlaces.css";

const SavedPlaces = () => {
  return (
    <div className="saved-places">
      <img src="https://source.unsplash.com/500x400/?city" alt="" />
      <span className="saved-places-name">Place 1</span>
      <span className="material-symbols-outlined add">add_circle</span>
    </div>
  );
};

export default SavedPlaces;
