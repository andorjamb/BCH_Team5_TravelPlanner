import React, {useState, useEffect} from 'react';
import {useParams} from'react-router-dom';
import { db } from '../../FireBaseInit';
import {
  collection, getDocs, onSnapshot, where, setLoading,
    doc, query
  } from "firebase/firestore";

import Weather from '../../components/Weather/Weather';
import CityContainer from '../../components/CityContainer/CityContainer';
import { async } from '@firebase/util';

import './CityView.css';

const CityView = () => {

let {cityname} = useParams();
const filteredSights =[];
//const sightsRef = collection(db, "sights");
//const q = query(collection(db, "sights"), where("cityName", "==", "helsinki"));
const [loading, setLoading] = useState(false);
const [citySights, setCitySights] = useState([]);

async function getData() { 
    await getDocs(collection(db, "sights"))
    .then((snapshot)=>snapshot.docs.forEach(
    (sight) => {
        if (sight.data().cityName == cityname){
            filteredSights.push(sight.data());
            setCitySights(filteredSights);
   }
   }))

};

function handleClick(){
    console.log('image clicked');
}

function favoriteClickHandler(){
    console.log('favorite clicked');
}
useEffect(()=>{
    setLoading(true);
    if (cityname) {
     getData();
}  
   // return 
setLoading(false);
 },[]);

    return (
        
        <div className="city-view">
            <h3>{cityname.charAt(0).toUpperCase() + cityname.substring(1)}</h3>
            <section className="top-container">
            <div className="description">
                <h4>Description</h4>
            </div>
            <div className="map"><h4>(map)</h4></div>
</section>
         <div className="weather">place holder for weather widget</div>
         {/*    < Weather 
            cityname = {cityname}/> */}
           {/*  */}
            <section className="sight-gallery">
              { citySights.map((sight)=>(
                <div className="gallery-card" onClick={handleClick} style={{ 
                    backgroundImage: `url('https://source.unsplash.com/500x400/?${sight.sightName}')` 
                  }}>
                    <h3>{sight.sightName}</h3>
                    <div className="favorite" onClick={favoriteClickHandler}>favorite</div>
                </div>
            
              )) } 
               
            </section>
        </div>
    );
};

export default CityView;