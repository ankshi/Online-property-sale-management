import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        console.warn(uname, password);
        let result = await fetch('http://localhost:4000/ologin', {
            method: 'post',
            body: JSON.stringify({ uname, password }),
            headers: { 'Content-type': 'application/json' }
        });

        result = await result.json();
        console.warn(result)
        if (result.id) {
            localStorage.setItem("owner", JSON.stringify(result.id));
            navigate("/ownerhome/");
        }
        else { alert(result); }
    }

    return (
        <div className="login">
            <div>
                <h3>Enter username:</h3>
                <input type="text" placeholder="Enter Username" onChange={(e) => setUname(e.target.value)} value={uname}></input>
                <h5>Password:</h5>
                <input type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button className="loginbutton" onClick={handleLogin} type="button">Login</button>
            </div>
            <h5>New Owner! Click here to Signup - <Link to="/osignup/">SignUP</Link></h5>
        </div>
    );
};



export default Login;
