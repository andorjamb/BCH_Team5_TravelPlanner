import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../FireBaseInit';
import { collection, getDocs, query, where, getDoc, doc } from "firebase/firestore";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, UncontrolledCarousel } from 'reactstrap';

import Weather from '../../components/Weather/Weather';
import Rating from '../../components/Rating/Rating';
import Map from '../../components/Map/Map';

import './CityView.css';

const CityView = () => {

  const { cityname } = useParams();
  const filteredSights = [];

  const [loading, setLoading] = useState(false);
  const [citySights, setCitySights] = useState([]);
  const [cityData, setCityData] = useState({ cityName: "", rating: "", googleId: "" });

  function favoriteClickHandler(e) {

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

  async function getSightData() {
    const querySnapshot = await getDocs(query(collection(db, "sights"), where("cityName", "==", `${cityname.toLowerCase()}`)));
    querySnapshot.forEach((doc) => {
      filteredSights.push(doc.data());
    })
    setCitySights(filteredSights);
  }

  function makeImageArray() {
    let imagesArray = [];
    let index = 0;
    class sightImage {
      constructor(altText, caption, key, src) {
        this.altText = altText;
        this.caption = caption;
        this.key = key;
        this.src = src;
      }
    }
    citySights.forEach((sight, index) => {

      sight = new sightImage(`${sight.sightName}`, `${sight.sightName}`, `${index++}`, `https://source.unsplash.com/500x400/?${sight.sightName}`
      );
      imagesArray.push(sight);
    }
    )
    return imagesArray;
  }


  /* 
    altText: `${sight.sightName}`,
      caption: `${sight.sightName},,
    key: 1,
    src: `https://source.unsplash.com/500x400/?${sight.sightName}` */

  useEffect(() => {
    setLoading(true);
    getSightData();
    getCityData();
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

          <UncontrolledCarousel
            items={makeImageArray()}


          /*     {[
                {
                  altText: "city",
                  caption: "church",
                  key: 1,
                  src: 'https://source.unsplash.com/500x400/?church'
    
    
                }
              ]} */

          />



          {/*    {citySights.map((sight) => (
            <div className="gallery-card" key="sight.id" style={{
              backgroundImage: `url('https://source.unsplash.com/500x400/?${sight.sightName}')`
            }}>
              <h3>{sight.sightName}</h3>
              <div className="favorite" id="sight.sightName" onClick={() => favoriteClickHandler}>favorite</div>
            </div>

          ))} */}

        </section>
      </main>
    </div >
  );
};

export default CityView;