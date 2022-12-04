import React, { useState, useEffect } from "react";
import { db } from '../../FireBaseInit';
import { collection, getDocs } from "firebase/firestore";

import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";
import CityExplore from "../../components/CityExplore/CityExplore";
import SearchBar from "../../components/SearchBar/SearchBar";
import TestRealtimeFirebase from "../../adminActions/TestRealtimeFirebase";

import "./ExploreView.css";

//const sightsRef = collection(db, "sights");
//const sightsDocs = await getDocs(query(sightsRef, where("cityName", "==", city)));

const ExploreView = ({ userName }) => {
  const [displayArray, setDisplayArray] = useState([]);
  const [cityData, setCityData] = useState([]);

  function makeNewRand(factor) { return (Math.floor(Math.random() * factor)) };

  function getRandArray() {
    let randNumbers = [];
    while (randNumbers.length < 4) {
      let newRandom = makeNewRand(cityData.length);
      if (randNumbers.includes(newRandom)) { makeNewRand(cityData.length) }
      else { randNumbers.push(newRandom); }
    }
    return randNumbers;
  }

  const searchHandler = (searchValue, targetArray, searchProperty) => {
    let displayArray = targetArray.filter(city =>
      city[{ searchProperty }].includes(searchValue.trim().toLowerCase())
    );
    if (displayArray.length !== 0) {
      setDisplayArray(displayArray);
      return true;
    }
    else { return false }
  };

  const getData = async () => {
    const data = await getDocs(collection(db, "cities"));
    data.docs.forEach((city) => {
      setCityData([...cityData, city.data()])
    })
  }

  useEffect(() => {
    getData();

  }, []);

  useEffect(() => {
    let randNumbers = getRandArray();
    let displayCities = cityData.filter((city) => randNumbers.includes(cityData.indexOf(city)));
    setDisplayArray({ displayCities });
  }, [cityData])


  return (
    <div className="view">
      <WelcomeUser userName={userName} />
      <div className="explore-intro">
        <p>Ready for an adventure?</p>
      </div>
      <SearchBar searchEvent={(e) => { searchHandler(e.target.value, cityData, 'cityName') }} />
      <main>
        {<CityExplore displayArray={displayArray}
        />}
        {/*  <TestRealtimeFirebase />
 */}      </main>
    </div>
  );
}

export default ExploreView; 
