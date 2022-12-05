import React, { useRef, useEffect } from "react";
//import { firestore } from "../FireBaseInit";
import { getDocs, doc, setDoc  } from "firebase/firestore";
import { db } from "../FireBaseInit";
import FormCss from './form.module.css'

const AddCityTripPlaces = ()=>{

class Sight  { 
  constructor(googleId,cityName,sightName,imgUrl, rating){
  this.googleId = googleId;
  this.cityName =cityName;
  this.sightName = sightName;
this.imgUrl =imgUrl;
this.rating =rating;
  }
}

//const ref = db.collection('sights');
//const setNew =(city, sight)=> {ref.doc(city).set(sight)};

/* const getSights = async () => {
    const data = await getDocs(ref);
    return data; 
  }; */


const googleId = useRef();
const cityName= useRef();
const sightName= useRef();
const imgUrl = useRef();
const rating = useRef();


const handleSend = async (e) => {
    e.preventDefault();
    let newSight = new Sight(googleId.current.value, cityName.current.value, sightName.current.value,
     imgUrl.current.value, rating.current.value);
   const sightRef = doc(db, 'sights', {googleId});
setDoc(sightRef, {newSight}, { merge: true });

  }

  return (

    <form className={FormCss.cityContainer} id="sightsForm" onSubmit={handleSend} >
        <h2>Welcome to citysights management section</h2>
          <p>
            Hi <span className={FormCss.wavehand}>👋</span>.  Let start adding citysights to our APP
          </p>
        <div className={FormCss.inputdetails}>
          <div className={FormCss.valueinputside}>
            <div className={FormCss.userbox}>
              <select name="cityName" id="cityName" ref={cityName}>
                <option value="">helsinki</option>
                <option value="">turku</option>
                <option value="">tampere</option>
                <option value="">oulu</option>
                <option value="">porvoo</option>
                <option value="">pori</option>
              </select>
              <label for="cityName">City name:</label>
            </div>
            <div className={FormCss.userbox}>
              <input type="text" name="sightName" id="sightName" placeholder="eg. White church" ref={sightName} required />
              <label for="sightName">City Sight:</label>
            </div>
            <div className={FormCss.userbox}>
              <input type="number" name="rating" id="rating" placeholder="eg. 4" ref={rating} required />
              <label for="rating">Rating:</label>
            </div>
            <div className={FormCss.userbox}>
              <input
                type="text"
                name="googleId" 
                id="googleId"
                ref={googleId}
                placeholder="eg. 09p445_4"
                required
              />
              <label for="googleId">Google id:</label>
            </div>
            <div className={FormCss.userbox}>
              <input
                type="text"
                name="imgUrl"
                id="imgUrl"
                ref="imgUrl"
                placeholder="eg. http//...."
                required
              />
              <label for="imgUrl">Image url:</label>
            </div>
          </div>
        </div>
     {/*    <label htmlFor="myfile">Select a file:</label>
        <input type="file" id="myimage" name="myimage" ref={imageurl} onChange={(e) => filechange(e)}></input> */}
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
)

}

export default AddCityTripPlaces;
