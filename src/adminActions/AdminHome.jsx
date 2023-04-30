import React, { useState } from 'react';
import { UserAuth } from '../components/Context/Context';

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