import React, { useState } from 'react';
import { useEffect } from 'react';

const Oinfo = () => {
    const oidgi = localStorage.getItem("owner");
    let oid = '';
    if (oidgi) {
        oid = JSON.parse(oidgi)[0];
    }

    const [info, setInfo] = useState([]);

    useEffect(() => {
        getinfo();
    }, [info]);

    const getinfo = async() => {
        let oinfo = await fetch(`http://localhost:4000/oinfo/${oid}`, {
            headers: {
                authorization: ` ${oid} ${JSON.parse(localStorage.getItem("otoken"))}`
            }
        });
        oinfo = await oinfo.json();
        if (oinfo[0].username) {
            setInfo(oinfo);
        }
        else { alert(oinfo); }
    }

    return (
        <div className="login">
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



export default Oinfo;
