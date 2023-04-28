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
            <h1>List of booking requests</h1>
            <h1 hidden={hide}>there are no pending/confirmed deals</h1>
            <h1 hidden={!hide}>list of pending deals</h1>
            {
                listbr.map((item, index) =>
                    <div>
                        <h1>customer username: {item.username}</h1>
                        <h1>street_name city pincode: {item.street_name} {item.city} {item.pincode}</h1>
                        <button onClick={() => accept(item)}>accept request</button>
                    </div>
                )
            }
        </div>
    );
};



export default Obookreq;
