// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfwkzXrI_YXsi6vruhmzvBEWRc1kBiU7c",
  authDomain: "api-project-32470662412.firebaseapp.com",
  databaseURL: "https://api-project-32470662412-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "api-project-32470662412",
  storageBucket: "api-project-32470662412.appspot.com",
  messagingSenderId: "32470662412",
  appId: "1:32470662412:web:0a60d34500d825dfe2dd29",
  measurementId: "G-1LYLMRZ0P3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);


// async function GetCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
//   }

//   export default GetCities;