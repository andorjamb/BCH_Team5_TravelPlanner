import React, { useEffect, useState } from 'react';
import {Spinner} from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { UserAuth } from '../components/Context/Context';
import { db } from '../FireBaseInit';
import {
    addDoc,
    serverTimestamp, collection, getDocs, onSnapshot, where,
    doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";

import AdminMenu from './AdminMenu';
import Error403 from './Error403';

const items =[];
const AdminHome = () => {

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

        if (!items.length>0 && users[0]?.email !== userEmail && !users[0]?.isAdmin) {
            return <> <Error403/></>
        }
        else {
       return ( <>
       <AdminMenu/>  <Outlet/>
       </>
        )    
        }
    }


    return (
        <div>
            <h1>Admin Home</h1>
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

export default AdminHome;