import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ExploreTrips = ({ notVisited }) => {

    const exploreTrips = notVisited.map((cityname) => (
        <Link to="/explore/:cityname"><li>{cityname}</li></Link>
    ))

    return (
        <div>
            {exploreTrips}
        </div>

    );
};

export default ExploreTrips;