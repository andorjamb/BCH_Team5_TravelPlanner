
import React from 'react';
import './Map.css'

const Map = ({ cityName }) => {

    const mapApiKey = process.env.REACT_APP_MAPBOX_API_KEY;
    //TODO: function to retrieve (lon,lat) values from API using cityName or Google Place_id
    const lon = undefined;
    const lat = undefined;
    return (
        <div className='map'>
            <img className="map-img" src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+c03030(24.9,60.1)/[18.7766,58.9565,35.1869,70.4466]/300x500?access_token=${mapApiKey}`} alt="map"></img>
        </div>
    );
};

export default Map;
