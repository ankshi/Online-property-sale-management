import React, { useState,useEffect } from 'react';

const Cinfo = () => {
    const cidgi = localStorage.getItem("customer");
    let cid = '';
    if (cidgi) {
        cid = JSON.parse(cidgi)[0];
    }

    const [info, setInfo] = useState([]);

    useEffect(() => {
        getinfo();
    }, [info]);

    const getinfo = async () => {
        let cinfo = await fetch(`http://localhost:4000/cinfo/${cid}`, {
            headers: {
                authorization: ` ${cid} ${JSON.parse(localStorage.getItem("ctoken"))}`
            }
        });
        cinfo = await cinfo.json();
        setInfo(cinfo);
    }

    return (
        <div className="login">
            <h1>Information about customer</h1>
            {
                info.map((item, index) =>
                    <div>
                        <h1>Welcome {item.name}</h1>
                        <h1>username: {item.username}</h1>
                        <h1>address: {item.street_name}</h1>
                        <h1>city: {item.city}</h1>
                        <h1>pincode: {item.pincode}</h1>
                        <h1>phonenumber: {item.phone_number}</h1>
                    </div>
                )
            }
        </div>
    );
};



export default Cinfo;
