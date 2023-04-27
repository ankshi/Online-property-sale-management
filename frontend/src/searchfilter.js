import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchfilter = () => {
    const authcustomer = localStorage.getItem("customer");
    const navigate = useNavigate();
    const saveproperty = () => {
        {
            authcustomer ?
                console.log("saving property")
                :
                navigate("/customerlogin/")
        }
    }
    const bookproperty = () => {
        {
            authcustomer ?
                console.log("Booking request sent")
                :
                navigate("/customerlogin/")
        }
    }
    return (
        <div className="login">
                <div>
                    <h1>search and filter options</h1>
                    <div>
                        <h1>property details</h1>
                        <h4><button onClick={saveproperty}>Save</button></h4>
                        <h4><button onClick={bookproperty}>Booking Request</button></h4>
                    </div>
                </div>
        </div>
    );
};



export default Searchfilter;