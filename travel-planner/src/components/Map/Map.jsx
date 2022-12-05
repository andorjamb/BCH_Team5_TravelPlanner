
import React from 'react';
import './Map.css'

const Map = ({ cityName }) => {

    //TODO: function to retrieve (lon,lat) values from API using cityName or Google Place_id
    return (
        <div className='map'>
            <img className="map-img" src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+c03030(24.9,60.1)/[18.7766,58.9565,35.1869,70.4466]/300x500?access_token=pk.eyJ1IjoiamFtYml1cyIsImEiOiJjbGI5d3hyMDMwejZoM3dxaDdmZm5oYXZzIn0.VaK4NVDUArlcKkIZlTfmJg" alt="map img"></img>
        </div>
    );
};

export default Map;
