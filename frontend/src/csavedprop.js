import React, { useState, useEffect } from 'react';

const Oinfo = () => {
    const [listsprop, setListsprop] = useState([]);
    const [hide, setHide] = useState(true);
    const cidgi = localStorage.getItem("customer");
    let cid = '';
    if (cidgi) {
        cid = JSON.parse(cidgi)[0];
    }
    useEffect(() => {
        lsprop();
    }, []);

    const lsprop = async() => {
        let result = await fetch(`http://localhost:4000/lsprop/${cid}`, {
            headers: {
                authorization: ` ${cid} ${JSON.parse(localStorage.getItem("ctoken"))}`
                }
            })
        result = await result.json();
        if (result[0].pincode) { setListsprop(result); }
        else if (result) { alert(result); }
        else { setHide(false); }
    }

    const bookreq = async (property) => {
        let result = await fetch(`http://localhost:4000/bookreq`, {
            method: 'Post',
            body: JSON.stringify([cid, property.oid, property.id]),
            headers: { 'Content-type': 'application/json' }

        })
        result = await result.json();
        if (result) {
            alert(result);
        }
    }

    return (
        <div className="bata">
            <h1>List of properties saved by customer</h1>
            <h1 hidden={hide}>no properties saved by customer</h1>
            {
                listsprop.map((item, index) =>
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
                        <button onClick={()=>bookreq(item)}>booking request</button>
                    </div>
                )
            }
        </div>
    );
};



export default Oinfo;
