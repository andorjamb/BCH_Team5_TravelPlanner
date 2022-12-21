import React from 'react';
import './Rating.css';


const Rating = ({rating}) => {

const ratingStars = (r) => {
        let stars = '';
        let i = 0;
        while (i < r) {
          stars += 'grade';
          i++;
        }
        return (stars);
      }
    return (
        <div className="rating">
           <span className="star"> {ratingStars(rating)}</span> 
        </div>
    );
};

export default Rating;