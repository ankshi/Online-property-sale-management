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
        <div className='bata'>
            <div >
                <form onSubmit={handleLogin}>
                    <h1 className='lala'>Login here!!!</h1>
                    <h2>Enter username:</h2>
                    <input className="inputBox" type="text" placeholder="Enter Username" onChange={(e) => setUname(e.target.value)} value={uname}></input>
                    <h2>Password:</h2>
                    <input className="inputBox" type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <button className="button" type="submit">Login</button>
                </form>
            </div>
            <h3>New Owner! Click here to Signup -<Link to="/osignup/">SignUP</Link></h3>
        </div>
    );
};



export default Login;
