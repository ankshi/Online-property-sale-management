import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Pcloginowner = () => {
    const auth = localStorage.getItem("owner");
    return auth ? <Navigate to="/ohome/oinfo" /> : <Outlet /> 
}

export default Pcloginowner 