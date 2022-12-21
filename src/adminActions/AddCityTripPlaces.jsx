import React, { useRef, useEffect,useState } from "react";
import { collection, getDocs,doc, setDoc } from "@firebase/firestore";
import { Spinner } from "react-bootstrap";
import { db } from "../FireBaseInit";
import FormCss from './form.module.css'

const cityData=[];
const AddCityTripPlaces = ()=>{

  const [loading, setLoading] = useState(true);
  const [cities,setCities] =useState([]);

class Sight  { 
  constructor(cityName,sightName,rating){
  this.cityName =cityName;
  this.sightName = sightName;
this.rating =rating;
  }
}

const getcities = async () =>{
  setLoading(true);
  const sightsSnapshot = await getDocs(collection(db, "sights"));
  sightsSnapshot.docs.forEach((sight) => {
    cityData.push(sight.data());
  })
  setCities(cityData);
  setLoading(false);
}

useEffect(()=>{
  getcities();
},[]);
//const ref = db.collection('sights');
//const setNew =(city, sight)=> {ref.doc(city).set(sight)};

/* const getSights = async () => {
    const data = await getDocs(ref);
    return data; 
  }; */

const cityName= useRef();
const sightName= useRef();
const rating = useRef();

const handleSend = async (e) => {
    e.preventDefault();
    if(cityName.current.value==="" || !cityName.current.value){
      alert('Please select city to procceed');
      return false;
    }
    let newSight = new Sight(
      cityName.current.value, 
      sightName.current.value,
    rating.current.value);
   const sightRef = doc(db, 'sights');
setDoc(sightRef, {newSight}, { merge: true });
}

  return (

  loading ? (<Spinner color="primary">  
  </Spinner>):
  ( 
    <form className={FormCss.cityContainer} id="sightsForm" onSubmit={handleSend} >
    {console.log(cities)}
        <h2>Welcome to citysights management section</h2>
          <p>
            Hi <span className={FormCss.wavehand}>👋</span>.  Let start adding citysights to our APP
          </p>
        <div className={FormCss.inputdetails}>
          <div className={FormCss.valueinputside}>
            <div className={FormCss.userbox}>
              <select name="cityName" id="cityName" ref={cityName}>
                <option value="">Select City</option>
                {cities.map(city =>
                <option value={city.cityName}>{city.cityName}</option>
                )}
              </select>
              <label  htmlFor="cityName">City name:</label>
            </div>
            <div className={FormCss.userbox}>
              <input type="text" name="sightName" id="sightName" placeholder="eg. White church" ref={sightName} required />
              <label htmlFor="sightName">City Sight:</label>
            </div>
            <div className={FormCss.userbox}>
              <input type="number" name="rating" id="rating" placeholder="eg. 4" ref={rating} required />
              <label htmlFor="rating">Rating:</label>
            </div>
          </div>
        </div>
        <div className="text_area">
          <div className="sendbtn">
            <button type="submit" className={FormCss.send}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Save ...
            </button>
        </div>

      </div>
    </form>
))

}

export default AddCityTripPlaces;
