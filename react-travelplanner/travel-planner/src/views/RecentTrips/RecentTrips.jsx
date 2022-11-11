import React from 'react';
import { useContext, createContext, useEffect, useState } from 'react';



 const RecentTrips = (props) => {
    const [user, setUser] = useState({});
    return (
        <div><h1>{props.trip}</h1>
            <div><p>{props.name}</p></div>
            <p>{props.date}</p>
            <p>{props.imageUrl}</p>
            <p>{props.rating}</p>
          </div>
    );
};

export default RecentTrips;