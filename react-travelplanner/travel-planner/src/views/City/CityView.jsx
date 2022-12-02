import React from 'react';
import {useParams} from'react-router-dom';

const CityView = () => {

    let {cityname} = useParams();
    return (
        <div>
            <h3>{cityname}</h3>
        </div>
    );
};

export default CityView;