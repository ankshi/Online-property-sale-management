import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';

const Ownerhome = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("owner");
        localStorage.removeItem("otoken");
        navigate("/");
    }
    return (
        <div>
            <ul>
                <li ><Link to="/ohome/oinfo" className="link">Ownerinfo</Link></li>
                <li ><Link to="/ohome/deals" className="link">Deals</Link></li>
                <li ><Link to="/ohome/addprop" className="link">Add Property</Link></li>
                <li ><Link to="/ohome/bookreq" className="link">Booking requests</Link></li>
                <li className="tada"><button className='tada' onClick={logout}>Logout</button></li>
            </ul>
            <Outlet />
        </div>
    );
};



export default Ownerhome;
