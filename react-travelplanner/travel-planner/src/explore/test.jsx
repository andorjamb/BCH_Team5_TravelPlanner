import React from "react";
import { useRef } from "react";
import { firestore } from "../FireBaseInit";
import { addDoc,collection,getDocs } from "@firebase/firestore";
import FormCss from './form.module.css'
const Tasting = () =>{
    const msgRef = useRef(); 
    const description = useRef(); const imageurl = useRef()
    const name = useRef();
    const ratings = useRef();const googleid=useRef();
    const ref = collection(firestore,'cities')
    // console.log(ref);

    const getCities = async () => {
        const data = await getDocs(ref);
        console.log(data);
    
      };
 
      getCities();
   const   filechange =(e)=> {
console.log(msgRef.current.value);
   }
    const handleSend = async(e) =>{
e.preventDefault();
console.log(msgRef.current.value);

let data ={
      cityName:
        {   
            description : description.current.value,
            imageurl:imageurl.current.value,
         name:msgRef.current.value,
            ratings : ratings.current.value,
        }
};
try{
    console.log(data);
    addDoc(ref,data);
}
catch (e){
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
            <input type="text" name="" placeholder="eg. Helsinki" ref={msgRef}  required />
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
      <input type="file" id="myimage" name="myimage" ref={imageurl} onChange={(e)=>filechange(e)}></input>
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

export default Tasting;