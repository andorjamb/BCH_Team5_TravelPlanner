import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../FireBaseInit';
import { collection, getDocs, query, where, getDoc, doc } from "firebase/firestore";

import Weather from '../../components/Weather/Weather';
import Rating from '../../components/Rating/Rating';
import Map from '../../components/Map/Map';

/* fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=400&explaintext&titles=Helsinki&format=json')
    .then((response) => response.json())
    .then((data) => console.log(data)); */

/*    onClick={window.scrollBy({
     top: 0,
     left: -300,
     behavior: 'smooth'
 })} */

import './CityView.css';

const CityView = () => {

  const { cityname } = useParams();
  const filteredSights = [];

  const [loading, setLoading] = useState(false);
  const [citySights, setCitySights] = useState([]);
  const [cityData, setCityData] = useState({ cityName: "", rating: "", googleId: "" });

  function favoriteClickHandler(e) {
    console.log('favorite clicked');
    try {
      localStorage.setItem("savedPlaces", JSON.stringify(e.target.id))
    }
    catch {
      console.log('Failed to set storage');
    }
  }
  async function getCityData() {

    const docRef = doc(db, "cities", `${cityname.toLowerCase()}`);
    const docSnap = await getDoc(docRef);
    setCityData(docSnap.data());

  }


  /*   async function getCoords() {
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityname},FI&limit=1&appid=${mapsApiKey}`)
        .then((res) => res.JSON)
        .then((data) => console.log('latitude response: ', data.lat));
  
  
    } */


  async function getSightData() {
    const querySnapshot = await getDocs(query(collection(db, "sights"), where("cityName", "==", `${cityname.toLowerCase()}`)));
    querySnapshot.forEach((doc) => {
      filteredSights.push(doc.data());
    })
    setCitySights(filteredSights);
  }

  useEffect(() => {
    setLoading(true);
    getSightData();
    getCityData();
    // getCoords();
    setLoading(false);
  }, []);



  return (
    <div className="city-view">
      <div className="city-view-banner" style={{
        backgroundImage: `url('https://source.unsplash.com/500x400/?${cityname}')`
      }}>
      </div>
      <div className='city-title'>  <h3>{cityname.charAt(0).toUpperCase() + cityname.substring(1)}</h3>
        <Rating rating={cityData.rating} />
      </div>

      <main>
        <section className="top-container">
          <div className="description">
            <h4>Top Places</h4>
            {loading ? <p>Loading...</p> :

              <ul> {citySights.map((sight) => (
                <li key={sight.id}>{sight.sightName}</li>))}</ul>
            }


          </div>
          <div><Map /></div>
        </section>
        <div>
          < Weather
            cityName={cityname} />

        </div>

        <section className="sight-gallery">
          {citySights.map((sight) => (
            <div className="gallery-card" key="sight.id" style={{
              backgroundImage: `url('https://source.unsplash.com/500x400/?${sight.sightName}')`
            }}>
              <h3>{sight.sightName}</h3>
              <div className="favorite" id="sight.sightName" onClick={() => favoriteClickHandler}>favorite</div>
            </div>

          ))}

        </section>
      </main>
    </div >
  );
};

export default CityView;