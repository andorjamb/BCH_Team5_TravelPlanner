import React from 'react';
import { Link } from 'react-router-dom';

const NextTripList = (props) => {
    return (
<div>

    <Link to='/planner'>< li>{props.name}</li></Link>
    <Link to='/planner'>< li>{props.name}</li></Link>
    <Link to='/planner'>< li>{props.name}</li></Link>
    <Link to='/planner'>< li>{props.name}</li></Link>
    <Link to='/planner'>< li>{props.name}</li></Link>
</div>

    );
};

export default NextTripList;