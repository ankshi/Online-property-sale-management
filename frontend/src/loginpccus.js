import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Pclogincus = () => {
    const auth = localStorage.getItem("customer");
    return auth ? <Navigate to="/chome/sfoptions" /> :  <Outlet />
}

export default Pclogincus