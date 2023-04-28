import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Osignup = () => {
    const [ID, setUname] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [phone, setNumber] = useState("");
    const navigate = useNavigate();
    const handleSignup = async (event) => {
        event.preventDefault();
        let result = await fetch('http://localhost:4000/osignup', {
            method: 'post',
            body: JSON.stringify({ ID, password, name, address, city, pincode, phone }),
            headers: { 'Content-type': 'application/json' }
        });

        result = await result.json();

        if (result) {
            alert(result);
            navigate("/ologin");
        }
    }

    return (
        <div className="login">
            <form onSubmit={handleSignup}>
                <h1 className='lala'>Signup here!</h1>

                <h2>Enter username:</h2>
                <input className='inputBox' type="text" placeholder="Enter Username" onChange={(e) => setUname(e.target.value)} value={ID} required></input>
                <h2>Password:</h2>
                <input className='inputBox' type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} required />

                <h2>Enter Contact details: </h2>
                <label>NAME: </label>
                <input className='inputBox' type='text' required onChange={(e) => setName(e.target.value)} placeholder='Enter name'></input>

                <label>Enter Address: </label>
                <input className='inputBox' type="text" required onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address'></input>

                <label>Enter City: </label>
                <input className='inputBox' type='text' required onChange={(e) => setCity(e.target.value)} placeholder='Enter City'></input>

                <label>Enter Pincode: </label>
                <input className='inputBox' type="number" required min='0' onChange={(e) => setPincode(e.target.value)} placeholder='Enter Pincode'></input>

                <label>Enter Phone_number: </label>
                <input className='inputBox' type="number" required min='10' onChange={(e) => setNumber(e.target.value)} placeholder='Enter Phone number'></input>
                <br />
                <button className='button' type="submit">Signup</button>
            </form>
            <h3>Have a account! Click here to <Link to="/ologin">login</Link></h3>
        </div>
    );
};



export default Osignup;
