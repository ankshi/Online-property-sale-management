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
            <ul className="home">
                <li className="home"><Link to="/ohome/oinfo" className="link">Ownerinfo</Link></li>
                <li className="home"><Link to="/ohome/deals" className="link">deals</Link></li>
                <li className="home"><Link to="/ohome/addprop" className="link">Add Property</Link></li>
                <li className="home"><Link to="/ohome/bookreq" className="link">Booking requests</Link></li>
                <li className="home"><button onClick={logout} className="link">Logout</button></li>
            </ul>
            <Outlet />
        </div>
    );
};



export default Ownerhome;
