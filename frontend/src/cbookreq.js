import React, { useState, useEffect } from 'react';

const Cbookreq = () => {
    const [brprop, setBrprop] = useState([]);
    const [hide, setHide] = useState(true);
    const cidgi = localStorage.getItem("customer");
    let cid = '';
    if (cidgi) {
        cid = JSON.parse(cidgi)[0];
    }
    useEffect(() => {
        lbreq();
    }, []);

    const lbreq = async () => {
        let result = await fetch(`http://localhost:4000/brprop/${cid}`, {
            headers: {
                authorization: ` ${cid} ${JSON.parse(localStorage.getItem("ctoken"))}`
                }
            })
        result = await result.json();
        if (result[0].pincode) { setBrprop(result); }
        else if (result) { alert(result); }
        else { setHide(false); }
    }

    return (
        <div>
            <h1> list of booking requests to owner </h1>
            <h1 hidden={hide}>no booking requests sent by customer</h1>
            {
                brprop.map((item, index) =>
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
                    </div>
                )
            }
        </div>
    )
}

export default Cbookreq;