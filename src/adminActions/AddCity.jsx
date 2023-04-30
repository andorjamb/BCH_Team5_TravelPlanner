import React from "react";
import { useRef } from "react";
import { db} from "../FireBaseInit";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import FormCss from './form.module.css'

const NewCity = () => {
  // const msgRef = useRef();
   const imageurl = useRef();
  const cityName = useRef();
  const ratings = useRef(); const googleid = useRef();
  const ref = collection(db, 'cities')


  const getCities = async () => {
    const data = await getDocs(ref);

  };

  getCities();
  const filechange = (e) => {
    console.log(cityName.current.value);
  }
  const handleSend = async (e) => {
    e.preventDefault();

    let data = {
      [cityName.current.value]:
      {
        imageurl: imageurl.current.value,
        name: cityName.current.value,
        ratings: ratings.current.value,
        timeadded:new Date(Date.now()),
      }
    };
    try {
      await addDoc(ref, data,'12345rU8A3axQNTNlFAvnHhsG6en5qVJ3');
    }
    catch (e) {
      console.log(e);
    }

  }
const fetchcities = async () =>{



        try {
            
            let allCities = await getDocs(ref);
            console.log(allCities)

        } catch (err) {
            console.log(err)
        }

  
  // const docRef = doc(db, "cities", "SF");
  // const docSnap = await getDocs(docRef);
  
  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }
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
              <input type="text" name="" placeholder="eg. Helsinki" ref={cityName} required />
              <label>City name:</label>
            </div>
            <div className={FormCss.userbox}>
              <input type="number" name="" placeholder="eg. 4" ref={ratings} required />
              <label>Ratings:</label>
            </div>
          </div>
          <div className="valueinputside">
            <div className={FormCss.userbox}>
              <input
                type="text"
                name="" ref={googleid}
                placeholder="eg. 09p445_4"
                required
              />
              <label>Google id:</label>
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
              Save
            </button>
          </div>
        </div>

      </div>
    </form>
<button onClick={fetchcities}>get cities</button>
  </div>)

}

export default NewCity;
