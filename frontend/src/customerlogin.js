import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerLogin = () => {
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        let result = await fetch('http://localhost:4000/clogin', {
            method: 'post',
            body: JSON.stringify({ uname, password }),
            headers: { 'Content-type': 'application/json' }
        });

        result = await result.json();

        if (result.auth) {
            localStorage.setItem("customer", JSON.stringify([result.customer.id, result.customer.username]));
            localStorage.setItem("ctoken", JSON.stringify(result.auth));
            navigate("/chome/sfoptions");
        }
        else { alert(result); }
    }

    return (
        <div className="login">
            <h1 className='lala'>Login here!!!</h1>
            <h2>Enter username:</h2>
            <input className="inputBox" type="text" placeholder="Enter Username" onChange={(e) => setUname(e.target.value)} value={uname} />
            <h2>Password:</h2>
            <input className="inputBox"type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button className="button" onClick={handleLogin} type="button">Login</button>
            <h3>New Customer! Click here to Signup - <Link to="/csignup/">SignUP</Link></h3>
        </div>
    );
};



export default CustomerLogin;
