import React from 'react';
import AdminMenu from './AdminMenu';

const AdminHome = () => {
    const arg ={
        scroll: true,
        backdrop: true,
    }
    return (
        <div>
            <h1>Admin Home</h1>
            <AdminMenu {...arg}/>
        </div>
    );
};

export default AdminHome;