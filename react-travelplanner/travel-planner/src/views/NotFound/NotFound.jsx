import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>The page you are looking for cannot be found</h1>
            <p>Please return to the main page:</p>
            <span><Link to="/">Take me home</Link></span>
        </div>
    );
};

export default NotFound;