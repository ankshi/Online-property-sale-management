import React, { useState, useEffect } from 'react';

const Cdeals = () => {
    const [listdeals, setLdeals] = useState([]);
    const [hide, setHide] = useState(true);
    const cidgi = localStorage.getItem("customer");
    let cid = '';
    if (cidgi) {
        cid = JSON.parse(cidgi)[0];
    }
    useEffect(() => {
        ldeals();
    }, []);

    const ldeals = async () => {
        let result = await fetch(`http://localhost:4000/cdeals/${cid}`, {
            headers: {
                authorization: ` ${cid} ${JSON.parse(localStorage.getItem("ctoken"))}`
                }
            })
        result = await result.json();
        if (result[0].pincode) { setLdeals(result); }
        else if (result) { alert(result); }
        else { setHide(false); }
    }

    const confirm = async (property) => {
        let result = await fetch(`http://localhost:4000/confirm2`, {
            method: 'Post',
            body: JSON.stringify([cid, property.oid, property.id]),
            headers: {
                'Content-type': 'application/json',
                 authorization: ` ${cid} ${JSON.parse(localStorage.getItem("ctoken"))}`
            }

        })

        result = await result.json();
        if (result) {
            alert(result);
        }
    }

    return (
        <div>
            <h1>Pending/confirmed deals</h1>
            <h1 hidden={hide}>there are no pending/confirmed deals</h1>
            <h1 hidden={!hide}>list of pending deals</h1>
            {
                listdeals.filter((item) => { return (item.status === 3)}).map((item, index) =>
                    <div>
                        <h1>street_name city pincode: {item.street_name} {item.city} {item.pincode}</h1>
                        <h1>property is for {item.buyrent}</h1>
                        <h1>property type: {item.property_type}</h1>
                        <h1>property use: {item.property_use}</h1>
                        <h1>residential type: {item.residential_type}</h1>
                        <h1>area of property: {item.area} {item.sqft_acres}</h1>
                        <h1>price/rent: {item.price} dollars</h1>
                        <h1>Number of bedrooms: {item.bedrooms}</h1>
                        <h1>construction year: {item.construction_year}</h1>
                        <button onClick={() => confirm(item)}>confirm deal</button>
                    </div>
                )
            }
            <h1 hidden={!hide}>list of confirmed deals</h1>
            {
                listdeals.filter((item) => { return (item.status === 4) }).map((item, index) =>
                    <div>
                        <h1>street_name city pincode: {item.street_name} {item.city} {item.pincode}</h1>
                        <h1>property is for {item.buyrent}</h1>
                        <h1>property type: {item.property_type}</h1>
                        <h1>property use: {item.property_use}</h1>
                        <h1>residential type: {item.residential_type}</h1>
                        <h1>area of property: {item.area} {item.sqft_acres}</h1>
                        <h1>price/rent: {item.price} dollars</h1>
                        <h1>Number of bedrooms: {item.bedrooms}</h1>
                        <h1>construction year: {item.construction_year}</h1>
                        <button onClick={() => confirm(item)}>confirm deal</button>
                    </div>
                )
            }
        </div>
    )
}

export default Cdeals;