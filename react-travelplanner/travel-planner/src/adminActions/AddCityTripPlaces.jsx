import React from "react";
import { useRef } from "react";
import { firestore } from "../FireBaseInit";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { db } from "../FireBaseInit";
import FormCss from './form.module.css'

const AddCityTripPlaces = () => {
  const TourPlaceName = useRef();
  const description = useRef(); const imageurl = useRef()
  const cityName = useRef();
  const ratings = useRef(); const googleid = useRef();
  const ref = collection(firestore, 'sights')
  // console.log(ref);

  const getCities = async () => {
    const data = await getDocs(ref);
    console.log(data);

  };

  getCities();
  const filechange = (e) => {
    console.log(cityName.current.value);
  }
  const handleSend = async (e) => {
    e.preventDefault();
    console.log(cityName.current.value);

    let TourPlaces = {
      cityname:cityName,
        name: TourPlaceName,
        googleid: "0959pokj",
        imageUrl: "pathvvd",
        description: description,
        rating: ratings
};
    try {
      console.log(TourPlaces);
      addDoc(ref, TourPlaces);
    }
    catch (e) {
      console.log(e);
    }

  }

  return (<div>



    <form id="cityForm" onSubmit={handleSend} >
      <div className={FormCss.cityContainer}>
        <h2>Welcome to city management section</h2>
        <div>
          <p>
            Hi <span className={FormCss.wavehand}>👋</span>.  Let start adding cities to our APP
          </p>
        </div>
        <div className={FormCss.inputdetails}>
          <div className={FormCss.valueinputside}>
            <div className={FormCss.userbox}>
              <select name="cityName" id="" ref={cityName}>
                <option value="">helsinki</option>
                <option value="">turku</option>
                <option value="">tampere</option>
                <option value="">oulu</option>
              </select>
              <label>City name:</label>
            </div>
            <div className={FormCss.userbox}>
              <input type="text" name="" placeholder="eg. White church" ref={TourPlaceName} required />
              <label>Tour Place:</label>
            </div>
            <div className={FormCss.userbox}>
              <input type="number" name="" placeholder="eg. 4" ref={ratings} required />
              <label>Ratings:</label>
            </div>
            <div className={FormCss.userbox}>
              <input
                type="text"
                name="" ref={googleid}
                placeholder="eg. 09p445_4"
                required
              />
              <label>Google id:</label>
            </div>
            <div className={FormCss.userbox}>
              <input
                type="text"
                name=""
                placeholder="eg. http//...."
                required
              />
              <label>Weather url:</label>
            </div>
          </div>
        </div>
        <label htmlFor="myfile">Select a file:</label>
        <input type="file" id="myimage" name="myimage" ref={imageurl} onChange={(e) => filechange(e)}></input>
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

      </div>
    </form>

  </div>)

}

export default AddCityTripPlaces;
