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
  const name = useRef();
  const ratings = useRef(); const googleid = useRef();

  const ref = collection(firestore, 'cities')
  // console.log(ref);

  const getdata = async () => {
    const data = await getDocs(ref);
    console.log(data);

  };

  // getdata();
  const filechange = (e) => {

    console.log(TourPlaceName.current.value);
  }

  const handleSend = async (e) => {

    const docRef = doc(db, "cities", "M5ApaJ4zT2ahT1C6DIj4");
    e.preventDefault();
    console.log(TourPlaceName.current.value);

    let TuorPlaces = {
            name: "city1dataname3",
            googleid: "0959pokj",
            imageUrl: "pathvvd",
            description: "TuorPlaces",
            rating: 3
    };
    setDoc(docRef, TuorPlaces)
.then(docRef => {
    console.log("Entire Document has been updated successfully");
})
.catch(error => {
    console.log(error);
})
  //   try {
  //     // console.log(data);
  //     // addDoc(ref, data);
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }

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
              <select name="" id="">
                <option value="">helsinki</option>
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
          <textarea
            cols="30"
            rows="10"
            placeholder="Description ....." ref={description}
          ></textarea>
          <div className="sendbtn">
            <button type="submit" className={FormCss.send}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Save
            </button>
          </div>
        </div>

      </div>
    </form>

  </div>)

}

export default AddCityTripPlaces;
