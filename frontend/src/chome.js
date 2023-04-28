import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';

const Chome = () => {
    const navigate = useNavigate();
    console.log()
    const logout = () => {
        localStorage.removeItem("customer");
        localStorage.removeItem("ctoken");
        navigate("/");
    }
    return (
        <div>
            <ul className="home">
                <li className="home"><Link to="/chome/sfoptions" className="link">Home</Link></li>
                <li className="home"><Link to="/chome/cinfo" className="link">Customer info</Link></li>
                <li className="home"><Link to="/chome/bookedprop" className="link">Booking requests</Link></li>
                <li className="home"><Link to="/chome/savedprop" className="link">Saved Properties</Link></li>
                <li className="home"><Link to="/chome/deals" className="link">Deals</Link></li>
                <li className="tada"><button className="tada" onClick={logout}>Logout</button></li>
            </ul>
            <Outlet />
        </div>
    )
}

export default Chome;