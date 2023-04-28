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
        <div className="bata">
            <h1>Your info!!!</h1><br />
            {
                info.map((item, index) =>
                    <div>

                        <h1>Holaa!! {item.name}</h1>
                        <br />
                        <h2>Username: {item.username}</h2>
                        <h2>Door-no: {item.street_name}</h2>
                        <h2>City: {item.city}</h2>
                        <h2>Pincode: {item.pincode}</h2>
                        <h2>Phonenumber: {item.phone_number}</h2>
                    </div>
                )
            }
        </div>
    );
};



export default Cinfo;
