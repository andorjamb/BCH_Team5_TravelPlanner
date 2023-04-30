import React from 'react';
import { Link } from 'react-router-dom';
import './ExploreTrips.css'

/**
 * 
 * @param {Array} cityArray -  array of cityname strings
 * 
 */
const ExploreTrips = ({ cityArray }) => {
    
    const exploreList = cityArray.map((cityname ,index) => (
        <li key={cityname+index}>  <Link to={`/explore/${cityname}`}> {cityname}</Link></li>
    ))

    return (
        <ul>
            {exploreList}
        </ul>

    );
};

export default ExploreTrips;