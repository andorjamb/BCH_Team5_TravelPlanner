import React from "react";
import './PastTrip.css';

/**
 * 
 * @param {array} arr - array of user trip objects
 *    
 */

const PastTrip = ({ arr }) => {


    const sights = (trip) => trip.sights.map((sight,index) =>
        (<li key={sight.cityName+index} className="past-trip-sight-list" >{sight.sightName},{sight.cityName}</li>)
    )
    return (
        <>
            {arr.map((trip) => (
                <div key={trip.tripName} className="past-trip">
                    <div className="past-trip-image">
                        <img src={`https://source.unsplash.com/500x400/?finland&adventure`} alt={trip.tripName} />
                    </div>
                    <div className="trip-details">
                        <h3 className="trip-name">{trip.tripName}</h3>
                        <ol className="sights-list">{sights(trip)}</ol>
                        <p className="visit-date">Visited : {trip.tripDate}</p>
                        <p>Your trip rating: </p> {/* //TODO: rating functionality */}
                    </div>
                </div>
            ))}
        </>
    )
};

export default PastTrip;
