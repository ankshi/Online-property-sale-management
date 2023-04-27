import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (event) => {
        event.preventDefault();
        let result = await fetch('http://localhost:4000/ologin', {
            method: 'post',
            body: JSON.stringify({ uname, password }),
            headers: { 'Content-type': 'application/json' }
        });

        result = await result.json();
        console.log(result);
        if (result.auth) {
            localStorage.setItem("owner", JSON.stringify([result.owner.id, result.owner.username]));
            localStorage.setItem("otoken", JSON.stringify(result.auth));
            navigate("/ohome/oinfo");
        }
        else { alert(result); }
    }

    return (
        <div className="login">
            <div>
                <form onSubmit={handleLogin}>
                    <h3>Enter username:</h3>
                    <input type="text" placeholder="Enter Username" onChange={(e) => setUname(e.target.value)} value={uname}></input>
                    <h5>Password:</h5>
                    <input type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <button className="loginbutton" type="submit">Login</button>
                </form>
            </div>
            <h5>New Owner! Click here to Signup - <Link to="/osignup/">SignUP</Link></h5>
        </div>
    );
};



export default Login;
