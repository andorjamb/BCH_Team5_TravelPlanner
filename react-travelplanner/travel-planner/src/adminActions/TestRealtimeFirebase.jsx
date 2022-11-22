import React from "react";
import { useRef, useEffect, useState } from "react";
import { db } from "../FireBaseInit";
import {
    addDoc,
    serverTimestamp, collection, getDocs, onSnapshot, where, setLoading,
    doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";
import FormCss from './form.module.css';
import { v4 as uuidv4 } from 'uuid';
import { UserAuth } from "../components/Context/Context"
import e from "cors";


const items = [];
const TestRealtimeFirebase = () => {
    const [loading, setLoading] = useState(false);
    const [AllTrips, setTrips] = useState([]);
    const ref = collection(db, 'myplan')

    const { user } = UserAuth();

    const owner = user ? user.uid : 'unknown';
    const ownerEmail = user ? user.email : 'unknown';

    const tripName = useRef();
    const sightName = useRef();


    useEffect(() => {
        const q = query(
            ref,
            //  where('owner', '==', currentUserId),
            where('title', '==', 'School1') // does not need index
            //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
            // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
            // limit(1)
        );

        setLoading(true);
        // const unsub = onSnapshot(q, (querySnapshot) => {     to be used when query is present
        const unsub = onSnapshot(ref, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setTrips(items);
            setLoading(false);
            console.log(items);
        });
        return () => {
            unsub();
        };

        // eslint-disable-next-line
    }, []);

    // ADD FUNCTION
    const addTrips = async (e) => {
        e.preventDefault();

        const data = {
            transactionID: uuidv4(),
            userId: owner,
            tripname: ['trip1', 'trip2', 'trip3'],
            tripdate: new Date(Date.now()),
            datacreated: serverTimestamp(),
            dateupdated: serverTimestamp(),
            sightname: sightName.current.value,
        }

        try {
            const dataRef = doc(ref, data?.transactionID);
            console.log(data?.transactionID, data)
            await setDoc(dataRef, data);
            // if(doc was save) then sen email to the client of the scheduled trips 
        } catch (error) {
            console.error(error);
        }
    }

    //DELETE FUNCTION
    const deleteData = async (e) => {
        e.preventDefault();
        let newitem = items.filter((item) => item.transactionID === '09277ef2-b779-4b51-b59d-0aa235be469d');
        try {
            const dataRef = doc(ref, newitem[0].transactionID);
            await deleteDoc(dataRef, dataRef);
        } catch (error) {
            console.error(error);
        }
    }

    // EDIT FUNCTION
    const editData = async (e) => {
        e.preventDefault();
        let newitem = items.filter((item) => item.transactionID === 'eec883cb-65cd-4ac6-a7ed-990e6c4c2299');

        const updatedData = {
            sightname: ['suomihighland', 'underground', 'linanmaki', 'messukeskus'],
            lastUpdate: serverTimestamp(),
            tripdate: serverTimestamp(),
        };

        try {
            const datalRef = doc(ref, newitem[0].transactionID);
            updateDoc(datalRef, updatedData);
        } catch (error) {
            console.error(error);
        }

    }

    const sendEmail = async (email, Message, Subjects, Priority) => {
        const apiKey = 'YOUR_API_KEY';
        const apiURL = 'https://emailvalidation.abstractapi.com/v1/?api_key=' + '827c28c7689445c8aac96356dadd7981'
        try {
            const response = await fetch(apiURL + '&email=' + email);
            const data = await response.json();
            const isValidSMTP = data.is_smtp_valid.value;

            if (isValidSMTP) {
                // use the email address in the mailto link

                // <a href="mailto:`{email}`?subject={subject}&body={body}">Click to Send an Email</a>
            } else {
                // show the user an error
            }
        } catch (error) {
            throw error;
        }
    }

    return (<div>

        <form id="cityForm" onSubmit={addTrips} >
            <div className={FormCss.cityContainer}>
                <h2>Hi are you ready for the greate adventure.....</h2>
                <div>
                    <p>
                        Hi <span className={FormCss.wavehand}>👋</span>.  Let  add Trip, schedule you holiday
                    </p>
                </div>
                <div className={FormCss.inputdetails}>
                    <div className={FormCss.valueinputside}>
                        <div className={FormCss.userbox}>
                            <input type="text" name="" placeholder="eg. Summer 2022" ref={tripName} required />
                            <label>Trip Name:</label>
                        </div>
                    </div>
                    <div className="valueinputside">
                        <div className={FormCss.userbox}>
                            <input
                                type="text"
                                name="" ref={sightName}
                                placeholder="eg. Suomenlinna"
                                required
                            />
                            <label>sight Name:</label>
                        </div>
                    </div>
                </div>
                <div className="text_area">
                    <div className="sendbtn">
                        <button
                            className={FormCss.send} onSubmit={(e) => addTrips(e)} onClick={(e) => addTrips(e)}>
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

        {loading ? <h1>Loading...</h1> : <h1>Trips</h1>}
        {
            items.length
        }
        {items.filter(trips => trips.userId === owner).map(trip => (
            <div className="trips" key={trip.transactionID}>
                <h2>{trip.tripname}</h2>
                <p>{trip.sightname}</p>
                <p>{trip.tripdate.nanoseconds}</p>
                <p>{trip.tripName}</p>

            </div>

        ))}
        <button onClick={(e) => editData(e)}>Edit data</button>
        <button onClick={(e) => deleteData(e)}>delete data</button>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>)

}

export default TestRealtimeFirebase;
