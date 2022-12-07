import React from 'react';
import { NavLink } from 'react-router-dom';

const Error403 = () => {

    const style={
            backGroundImage:'url("https://source.unsplash.com/500x400/?peeping")'
    }
    return (
        <div className={style}>
            <h2>Not allowed to access</h2>
            <NavLink to='/'>Go Home</NavLink>

        
        </div>
    );
};

export default Error403;