import React, { useState, useEffect } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';
import { db } from "../FireBaseInit";
import {
    addDoc,
    serverTimestamp, collection, getDocs, onSnapshot, where,
    doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";

import { UserAuth } from '../components/Context/Context';
import { Button } from 'bootstrap';


const items = [];
const CheckAdmin = ({ children }) => {
    const ref = collection(db, 'admin')
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [userEmail, setUserID] = useState(user.email);


    useEffect(() => {
        const owner = user ? user.email : 'unknown';
        setUserID(owner);
    }, [user]);


    useEffect(() => {
        const q = query(
            ref,
            where('email', '==', `${userEmail}`)
        );
        setLoading(true);
        const unsub = onSnapshot(q, (querySnapshot) => {    // to be used when query is present
            // const unsub = onSnapshot(ref, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setUsers(items);
            setLoading(false);

        });
        return () => {
            unsub();
        };

    }, [users]);


    const userInAdmin = () => {

        if (items.length>0 && users[0]?.email === userEmail) {
            return <NavLink to='/admin'> Admin Page</NavLink>
        }
        else {
            return <></>
        }
    }
    return (
        <div>
            {loading ? (
                <Spinner color="primary">  
                </Spinner>
            ):(
                userInAdmin()
            )
            }

        </div>
    );
};

export default CheckAdmin;