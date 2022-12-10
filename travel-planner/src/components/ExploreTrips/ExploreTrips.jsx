import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 
 * @param {Array} cityArray -  array of cityname strings
 * 
 */
const ExploreTrips = ({ cityArray }) => {
    const exploreList = cityArray.map((cityname) => (
        <Link to='/explore/:cityname'><li>{cityname}</li></Link>
    ))

    return (
        <div>
            {exploreList}
        </div>

    );
};

export default ExploreTrips;