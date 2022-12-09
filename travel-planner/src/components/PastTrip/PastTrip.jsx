import React from "react";
import './PastTrip.css';


const PastTrip = (props) => {
    return (
        <div className="past-trip">
            <div className="past-trip-image">
                <img src={`https://source.unsplash.com/500x400/?finland&adventure`} alt={props.name} />
            </div>
            <div className="trip-details">
                <h3 className="trip-name">{props.name}</h3>
                <ol className="sights-list">{props.sightLists}</ol>
                <p>visited : {props.date}</p>

            </div>


        </div>
    );
};

export default PastTrip;
