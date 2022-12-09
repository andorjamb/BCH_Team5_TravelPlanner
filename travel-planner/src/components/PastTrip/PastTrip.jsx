import React from "react";
import './PastTrip.css';

/**
 * 
 * @param {array} arr - array of user trip objects
 *    
 */

const PastTrip = ({ arr }) => {
    const sights = (trip) => trip.sights.map((sight) =>
        (<li>{sight.sightName}in {sight.Cityname}</li>)
    )
    return (
        <>
            {arr.map((trip) => (
                <div className="past-trip">
                    <div className="past-trip-image">
                        <img src={`https://source.unsplash.com/500x400/?finland&adventure`} alt={trip.tripName} />
                    </div>
                    <div className="trip-details">
                        <h3 className="trip-name">{trip.tripName}</h3>
                        <ol className="sights-list">{sights(trip)}</ol>
                        <p>You visited on : {trip.date}</p>
                    </div>
                </div>
            ))}
        </>
    )
};

export default PastTrip;
