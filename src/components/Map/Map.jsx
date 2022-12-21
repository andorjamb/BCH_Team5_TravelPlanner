
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Map.css'

const Map = ({ cityName }) => {

    const mapApiKey = process.env.REACT_APP_MAPBOX_API_KEY;
    const APIKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const fuxxy = useParams();
    const [lon, setLon] = useState();
    const [lat, setLat] = useState();

    async function getCoords() {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${fuxxy.cityname},FI&limit=1&appid=${APIKey}`)
            .then((res) => res.json())
            .then((data) => {
                setLat(data[0].lat);
                setLon(data[0].lon);
            });
    }

    useEffect(() => {

        getCoords();
    }, [])

    return (
        <div className='map'>
            <img className="map-img" src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+c03030(${lon},${lat})/[18.7766,58.9565,35.1869,70.4466]/300x500?access_token=${mapApiKey}`} alt={fuxxy.cityName}></img>
        </div>
    );
};

export default Map;
