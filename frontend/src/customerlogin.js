import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const CustomerLogin = () => {
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        console.warn(uname, password);
        let result = await fetch('http://localhost:4000/clogin', {
            method: 'post',
            body: JSON.stringify({ uname, password }),
            headers: { 'Content-type': 'application/json' }
        });

        result = await result.json();

        if (result.id) {
            localStorage.setItem("customer", JSON.stringify(result.id));
            navigate(-1);
        }
        else { alert(result); }
    }

    return (
        <div className="login">
            <h3>Enter username:</h3>
            <input type="text" placeholder="Enter Username" onChange={(e) => setUname(e.target.value)} value={uname} />
            <h5>Password:</h5>
            <input type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} type="button">Login</button>
            <h5>New Customer! Click here to Signup - <Link to="/csignup/">SignUP</Link></h5>
        </div>
    );
};



export default CustomerLogin;
