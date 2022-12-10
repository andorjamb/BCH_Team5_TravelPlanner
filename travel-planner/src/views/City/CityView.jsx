import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../FireBaseInit';
import { collection, getDocs, query, where } from "firebase/firestore";

import Weather from '../../components/Weather/Weather';
import Rating from '../../components/Rating/Rating';
import Map from '../../components/Map/Map';

//const city = 'helsinki';
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

  function favoriteClickHandler(e) {
    console.log('favorite clicked');
    try {
      localStorage.setItem("savedPlaces", JSON.stringify(e.target.id))
    }
    catch {
      console.log('Failed to set storage');
    }
  }


  async function getData() {
    const querySnapshot = await getDocs(query(collection(db, "sights"), where("cityName", "==", `${cityname.toLowerCase()}`)));
    querySnapshot.forEach((doc) => {
      filteredSights.push(doc.data());
    })
    setCitySights(filteredSights);
  }

  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
    console.log(citySights);
    console.log(filteredSights);
  }, []);

  const sightsMap = () => {
    filteredSights.map((sight) => (
      <li>{sight.sightName}</li>))
  }

  /*   [{ cityName: 'espoo', sightName: 'Kino Tapiola', rating: 4 },
    { cityName: 'espoo', sightName: 'Ikea Espoo', rating: 5 }] */

  return (
    <div className="city-view">
      <div className="city-view-banner" style={{
        backgroundImage: `url('https://source.unsplash.com/500x400/?${cityname}')`
      }}>
      </div>
      <div className='city-title'>  <h3>{cityname.charAt(0).toUpperCase() + cityname.substring(1)}</h3></div>

      <main>
        <section className="top-container">
          <div className="description">
            <h4>Top Places</h4>
            {loading ? <p>Loading...</p> :

              <ul> {filteredSights.map((sight) => {
                return (<li> key={sight.sightName}{sight.sightName}</li>)
              })
              }</ul>


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
            <div className="gallery-card" key="sight.sightName" style={{
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