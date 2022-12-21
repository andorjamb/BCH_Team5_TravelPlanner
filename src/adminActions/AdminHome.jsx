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

// const items =[];
const AdminHome = () => {

    // const ref = collection(db, 'admin')
    const { user ,role} = UserAuth();
    const [loading, setLoading] = useState(false);

    const userInAdmin = () => {
const currentRole = role || false
        if (!currentRole ) {
            setLoading(false);
            return <> <Error403/></>
        }
        else {
            setLoading(false);
       return ( <>
       <AdminMenu/>  
        {/* <Outlet/>  */}
       </>
        )    
        }
    }


    return (
        <div>
            <h1>Admin Home</h1>
            {
                userInAdmin()
          
            }
           
        </div>
    );
};

export default AdminHome;