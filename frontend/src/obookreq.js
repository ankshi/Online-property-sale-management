import React, { useState, useEffect } from 'react';

const Obookreq = () => {
    const [listbr, setLbr] = useState([]);
    const [hide, setHide] = useState(true);
    const oidgi = localStorage.getItem("owner");
    let oid = '';
    if (oidgi) {
        oid = JSON.parse(oidgi)[0];
    }
    useEffect(() => {
        lbreq();
    }, []);

    const lbreq = async () => {
        let result = await fetch(`http://localhost:4000/olbreq/${oid}`)
        result = await result.json();
        if (result) { setLbr(result); }
        else { setHide(false); }
    }

    const accept = async (property) => {
        let result = await fetch(`http://localhost:4000/bookacc`, {
            method: 'Post',
            body: JSON.stringify([property.cid, oid, property.id]),
            headers: {
                'Content-type': 'application/json',
                 authorization: ` ${oid} ${JSON.parse(localStorage.getItem("otoken"))}`
            }

        })
        result = await result.json();
        if (result) {
            alert(result);
        }
    }

    return (
        <div className="bata">
            <h1>Booking requests</h1>
            {
                listbr.map((item, index) =>
                    <span>
                        <table id='customers'>
                            <tr><td className='haha'>Customer name:</td><td> {item.username}</td></tr>
                            <tr><td className='haha'>PhoneNumber:</td><td> {item.phone_number}</td></tr>
                            <tr><td className='haha'>Streetname,city,pincode:</td><td> {item.street_name} {item.city} {item.pincode}</td></tr>
                        </table><br />
                        <button className='jaja' onClick={() => accept(item)}>Accept request</button>
                    </span>
                )
            }
        </div>
    );
};



export default Obookreq;
