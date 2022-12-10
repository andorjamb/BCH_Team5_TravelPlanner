import React from 'react';
//simport { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

/**
 * 
 * @param {Array} cityArray -  array of cityname strings
 * 
 */
const ExploreTrips = ({ cityArray }) => {
    const exploreTrips = cityArray.map((cityname) => (
        <Link to="/explore/:cityname"><li>{cityname}</li></Link>
    ))

    return (
        <div>
            {exploreTrips}
        </div>

    );
};

export default ExploreTrips;