import React from 'react';
import { Link } from 'react-router-dom';
import Searchfilter from './searchfilter.js';

const Nav = () => {
    const authowner = localStorage.getItem("owner");
    const authcus = localStorage.getItem("customer");
    let owneruname = '';
    let cusuname = '';
    if (authowner) {
        owneruname = JSON.parse(authowner)[1];
    }
    if (authcus) {
        cusuname = JSON.parse(authcus)[1];
    }

    return (
        <div>
            <ul >
                {authowner ?
                    <li><Link to="/ohome/oinfo">Welcome {owneruname}</Link></li>
                    :
                    <li><Link to="/ologin">Login as Owner</Link></li>
                }
                {authcus ?
                    <li><Link to="/chome/sfoptions">Welcome {cusuname}</Link></li>
                    :
                    <li><Link to="/clogin">Login as Customer</Link></li>
                }
            </ul>
            <Searchfilter />
        </div>
    );
};




export default Nav;
