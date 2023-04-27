import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerLogin = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate(-1);
    }

    return (
        <div className="login">
            <h3>enter Owner details</h3>
            <button onClick={handleLogin} type="button">Signup</button>
        </div>
    );
};



export default CustomerLogin;
