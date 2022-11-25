import React from 'react';
import './UpcomingTrips.css';

const UpcomingTrips = (props) => {
    return (
        <div className="upcoming-trips">
            <h3 className="trip-name">{props.tripName}</h3>
            <img src={props.tripImg} alt="tripImage" />
            <p>Cities on this trip: {props.tripCities}</p>
        </div>
    );
};

export default UpcomingTrips;