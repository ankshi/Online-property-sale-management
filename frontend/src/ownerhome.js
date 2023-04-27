import React, { useState } from 'react';
import { Link,useNavigate, Outlet } from 'react-router-dom';

const Ownerhome = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div>
            <ul className="home">
                <li className="home"><Link to="/ownerhome/info" className="link">Ownerinfo</Link></li>
                <li className="home"><Link to="/ownerhome/prop" className="link">property details</Link></li>
                <li className="home"><Link to="/ownerhome/sprop" className="link">Sold properties</Link></li>
                <li className="home"><Link to="/ownerhome/addprop" className="link">Add Property</Link></li>
                <li className="home"><Link to="/ownerhome/lbookreq" className="link">Booking requests</Link></li>
                <li className="home"><Link onClick={logout} to="/" className="link">Logout</Link></li>
            </ul>
            <Outlet />
        </div>
    );
};



export default Ownerhome;
