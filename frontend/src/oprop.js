import React, { useState, useEffect } from 'react';

const Oprop = () => {
    const [listdeals, setLdeals] = useState([]);
    const [hide, setHide] = useState(true);
    const oidgi = localStorage.getItem("owner");
    let oid = '';
    if (oidgi) {
        oid = JSON.parse(oidgi)[0];
    }
    useEffect(() => {
        ldeals();
    }, []);

    const ldeals = async () => {
        let result = await fetch(`http://localhost:4000/odeals/${oid}`, {
            headers: {
                authorization: ` ${oid} ${JSON.parse(localStorage.getItem("otoken"))}`
            }
        })
        result = await result.json();
        if (result[0].username) { setLdeals(result); }
        else { setHide(false); }
    }

    const confirm = async (property) => {
        let result = await fetch(`http://localhost:4000/confirm1`, {
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
            <h1 hidden={!hide}>Pending deals</h1>
            {
                listdeals.filter((item) => { return (item.status === 3) }).map((item, index) =>
                    <span>
                        <table id='customers'>
                            <tr><td className='haha'>Customer name:</td><td> {item.username}</td></tr>
                            <tr><td className='haha'>PhoneNumber:</td><td> {item.phone_number}</td></tr>
                            <tr><td className='haha'>Streetname,city,pincode:</td><td> {item.street_name} {item.city} {item.pincode}</td></tr>
                        </table><br />
                        <button className='jaja' onClick={() => confirm(item)}>Confirm deal</button>
                     </span>
                )
            }
            <h1 hidden={!hide}>Confirmed deals</h1>
            {
                listdeals.filter((item) => { return (item.status === 4) }).map((item, index) =>
                    <span>
                    <table id='customers'>
                        <tr><td className='haha'>Customer name:</td><td> {item.username}</td></tr>
                        <tr><td className='haha'>PhoneNumber:</td><td> {item.phone_number}</td></tr>
                        <tr><td className='haha'>Streetname,city,pincode:</td><td> {item.street_name} {item.city} {item.pincode}</td></tr>
                     </table>
                    </span>
                )
            }
        </div>
    );
};



export default Oprop;
