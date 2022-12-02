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
                console.log('found one');
                console.log(sight.data());
                filteredSights.push(sight.data());
                setCitySights([...citySights, ...filteredSights]);
   }
   }))

};


useEffect(()=>{
    setLoading(true);
    if (cityname) {
     getData();
    
}  

   // return <div className="favorite">favorite</div>

setLoading(false);

 },[]);

/* style={{ 
                    backgroundImage: `url("https://via.placeholder.com/500")` 
                  }} */
    return (
        
        <div className="city-view">
            <h3>{cityname.charAt(0).toUpperCase() + cityname.substring(1)}</h3>
            <section className="top-container">
            <div className="description">
                <h4>Description</h4>
            </div>
            <div className="map"></div>
</section>
         {/*    < Weather 
            cityname = {cityname}/> */}
           {/*  */}
            <section className="sight-gallery">
              { citySights.map((sight)=>(
                <div className="gallery-card">
                    <h4>{sight.sightName}</h4>
                    
                </div>
            
              )) } 
               
            </section>
        </div>
    );
};

export default CityView;