import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {
    const auth = localStorage.getItem("owner");
    return auth ? <Outlet /> : <Navigate to="/ologin/" />
}

export default PrivateComponent