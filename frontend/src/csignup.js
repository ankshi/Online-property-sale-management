import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerLogin = () => {
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
        let result = await fetch('http://localhost:4000/csignup', {
            method: 'post',
            body: JSON.stringify({ ID, password, name, address, city, pincode, phone }),
            headers: { 'Content-type': 'application/json' }
        });

        result = await result.json();

        if (result) {
            alert(result);
            navigate("/clogin");
        }
    }

    return (
        <div className="login">
            <form onSubmit={handleSignup}>
                <h3>Enter username:</h3>
                <input type="text" placeholder="Enter Username" onChange={(e) => setUname(e.target.value)} value={ID} required></input>
                <h5>Password:</h5>
                <input type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
                <br />
                <h3>Enter Contact details: </h3>
                <label>NAME: </label>
                <input type='text' required onChange={(e) => setName(e.target.value)} placeholder='Enter name'></input>
                <br />
                <label>Enter Address: </label>
                <input type="text" required onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address'></input>
                <br />
                <label>Enter City: </label>
                <input type='text' required onChange={(e) => setCity(e.target.value)} placeholder='Enter City'></input>
                <br />
                <label>Enter Pincode: </label>
                <input type="number" required min='0' onChange={(e) => setPincode(e.target.value)} placeholder='Enter Pincode'></input>
                <br />
                <label>Enter Phone_number: </label>
                <input type="number" required size='10' onChange={(e) => setNumber(e.target.value)} placeholder='Enter Phone number'></input>
                <br />
                <button type="submit">Signup</button>
            </form>
            <h5>Have a account! Click here to <Link to="/clogin">login</Link></h5>
        </div>
    );
};



export default CustomerLogin;
