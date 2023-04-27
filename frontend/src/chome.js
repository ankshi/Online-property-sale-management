import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';

const Chome = () => {
    const navigate = useNavigate();
    const url = window.location.href;
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
                <li className="home"><Link to="/chome/cinfo" className="link">customer info</Link></li>
                <li className="home"><Link to="/chome/bookedprop" className="link">booking_requests</Link></li>
                <li className="home"><Link to="/chome/savedprop" className="link">SavedProperties</Link></li>
                <li className="home"><Link to="/chome/deals" className="link">deals</Link></li>
                <li className="home"><button onClick={logout} className="link">Logout</button></li>
            </ul>
            <Outlet />
        </div>
    )
}

export default Chome;