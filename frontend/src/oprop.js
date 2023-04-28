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
        <div className='bata'>
            <h1>List of pending/confirmed deals</h1>
            <h1 hidden={hide}>there are no pending/confirmed deals</h1>
            <h1 hidden={!hide}>list of pending deals</h1>
            {
                listdeals.filter((item) => { return (item.status === 3) }).map((item, index) =>
                    <div>
                        <h1>customer name: {item.username}</h1>
                        <h1>street_name city pincode: {item.street_name} {item.city} {item.pincode}</h1>
                        <button onClick={() => confirm(item)}>confirm deal</button>
                    </div>
                )
            }
            <h1 hidden={!hide}>list of confirmed deals</h1>
            {
                listdeals.filter((item) => { return (item.status === 4) }).map((item, index) =>
                    <div>
                        <h1>customer name: {item.username}</h1>
                        <h1>street_name city pincode: {item.street_name} {item.city} {item.pincode}</h1>
                    </div>
                )
            }
        </div>
    );
};



export default Oprop;
