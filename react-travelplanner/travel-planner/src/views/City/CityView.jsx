import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../FireBaseInit';
import { collection, getDocs } from "firebase/firestore";

import Weather from '../../components/Weather/Weather';
import Rating from '../../components/Rating/Rating';

//const city = 'helsinki';
/* fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=400&explaintext&titles=Helsinki&format=json')
    .then((response) => response.json())
    .then((data) => console.log(data)); */

import './CityView.css';

const CityView = () => {

  let { cityname } = useParams();
  const filteredSights = [];
  //const sightsRef = collection(db, "sights");
  //const q = query(collection(db, "sights"), where("cityName", "==", "helsinki"));
  const [loading, setLoading] = useState(false);
  const [citySights, setCitySights] = useState([]);
  const [rating, setRating] = useState();

  async function getData() {
    await getDocs(collection(db, "sights"))
      .then((snapshot) => snapshot.docs.forEach(
        (sight) => {
          if (sight.data().cityName.toLowerCase() === cityname) {
            filteredSights.push(sight.data());
            setCitySights(filteredSights);
          }
        }))

  };

  function handleClick() {
    console.log('image clicked');
  }

  function favoriteClickHandler(e) {
    console.log('favorite clicked');
    try {
      localStorage.setItem("savedPlaces", JSON.stringify(e.target.id))
    }
    catch {
      console.log('Failed to set storage');
    }
  }
  useEffect(() => {
    setLoading(true);
    if (cityname) {
      getData();
    }
    // return 
    setLoading(false);
  }, []);

  return (

    <div className="city-view">
      <div className="city-view-banner" style={{
        backgroundImage: `url('https://source.unsplash.com/500x400/?${cityname}')`
      }}>
      </div>
      <h3>{cityname.charAt(0).toUpperCase() + cityname.substring(1)}</h3>
      <Rating rating={cityname.rating} />
      <section className="top-container">
        <div className="description">
          <h4>Description</h4>
        </div>
        <div className="map"><h4>(map)</h4></div>
      </section>
      <div>
        < Weather
          cityName={cityname} />

      </div>

      <section className="sight-gallery">
        {citySights.map((sight) => (
          <div className="gallery-card" key="sight.sightName" onClick={handleClick} style={{
            backgroundImage: `url('https://source.unsplash.com/500x400/?${sight.sightName}')`
          }}>
            <h3>{sight.sightName}</h3>
            <div className="favorite" id="sight.sightName" onClick={() => favoriteClickHandler}>favorite</div>
          </div>

        ))}

      </section>
    </div>
  );
};

export default CityView;