import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponentc= () => {
    const auth = localStorage.getItem("customer");
    return auth ? <Outlet /> : <Navigate to="/clogin/" />
}

export default PrivateComponentc