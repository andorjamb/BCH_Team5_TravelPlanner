import {db} from  './FireBaseInit';
import React from "react";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
  } from "@firebase/firestore";
class Main extends React.Component {
    state = {
        cities : ''
      }
      
      
       getUsers = async () => {
       const CollectionReference = collection(db, 'cities');
        const data = await getDocs(CollectionReference);
        const citySnapshot = await getDocs(CollectionReference);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        console.log(data,cityList);
        //use spread operator to return all fields from data
      };
    

       
      //      const citiesCol = collection(db, 'cities');
//      const citySnapshot = await getDocs(citiesCol);
//      const cityList = citySnapshot.docs.map(doc => doc.data());
    render () {  
        console.log(this.state.cities);
    return (
        <main className="container">

        </main>
    );
    }

}

export default Main;