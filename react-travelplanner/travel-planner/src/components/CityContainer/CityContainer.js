import React, { useState, useEffect } from 'react';
import Rating from '../Rating/Rating'
import Weather from "../Weather/Weather"
import "./CityContainer.css";
import { db } from '../../FireBaseInit';
import { collection, getDocs } from "firebase/firestore";


const CityContainer = ({ cityName, rating }) => {

  const [sightsArray, setSightsArray] = useState([]);

  const sightData = [];

  async function getSights() {
    const sightsData = await getDocs(collection(db, "sights"));
    sightsData.docs.forEach((sight) => {
      sightData.push(sight.data());
    }
    );
    return sightsData;
  }



  useEffect(() => {
    setSightsArray(getSights());
    console.log(sightsArray);
    /*  const sightsList = () => { sightsArray.filter((sight) => sight.cityName == { cityName })  */


  }, []);


  return (
    <div className="city-container" >
      <div className="city-img">
        <img
          src={`https://source.unsplash.com/500x400/?${cityName}`}
          alt="city img"
        />
      </div>
      <div className="city-info">
        <h3 className="city-name">{cityName}</h3>
        {/* <p><ul>{sightsList.map((sight) => (<li>{sight.sightName}</li>))}</ul></p> */}
        <Rating rating={rating} />
        <Weather cityName={cityName} />
      </div>
    </div>
  );
};

export default CityContainer;
