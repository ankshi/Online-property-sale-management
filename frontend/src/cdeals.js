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
        <div className='login'>
            <h1 hidden={!hide}>Pending deals</h1>
            {
                listdeals.filter((item) => { return (item.status === 3)}).map((item, index) =>
                    <span>
                        <table id='customers'>

                            <tr><td className='haha'>Property is for</td> <td>{item.buyrent}</td></tr>
                            <tr><td className='haha'>Property type: </td><td>{item.property_type}</td></tr>
                            <tr><td className='haha'>Property use: </td><td>{item.property_use}</td></tr>
                            <tr><td className='haha'>Area of property:</td> <td>{item.area} {item.sqft_acres}</td></tr>
                            <tr><td className='haha'>Street,city,pincode:</td><td>{item.street_name} {item.city} {item.pincode}</td></tr>
                            <tr><td className='haha'>Price/rent:</td> <td>{item.price} dollars</td></tr>
                            <tr><td className='haha'>Construction year:</td> <td>{item.construction_year}</td></tr>
                            <tr><td className='haha'>Residential type: </td><td>{item.residential_type}</td></tr>
                            <tr><td className='haha'>Number of bedrooms: </td><td>{item.bedrooms}</td></tr>
                            <button onClick={() => confirm(item)}>confirm deal</button>
                        </table>
                    </span>
                )
            }
            <h1 hidden={!hide}>Confirmed deals</h1>
            {
                listdeals.filter((item) => { return (item.status === 4) }).map((item, index) =>
                    <span>
                        <table id='customers'>

                            <tr><td className='haha'>Property is for</td> <td>{item.buyrent}</td></tr>
                            <tr><td className='haha'>Property type: </td><td>{item.property_type}</td></tr>
                            <tr><td className='haha'>Property use: </td><td>{item.property_use}</td></tr>
                            <tr><td className='haha'>Area of property:</td> <td>{item.area} {item.sqft_acres}</td></tr>
                            <tr><td className='haha'>Street,city,pincode:</td><td>{item.street_name} {item.city} {item.pincode}</td></tr>
                            <tr><td className='haha'>Price/rent:</td> <td>{item.price} dollars</td></tr>
                            <tr><td className='haha'>Construction year:</td> <td>{item.construction_year}</td></tr>
                            <tr><td className='haha'>Residential type: </td><td>{item.residential_type}</td></tr>
                            <tr><td className='haha'>Number of bedrooms: </td><td>{item.bedrooms}</td></tr>
                        </table>
                    </span>
                )
            }
        </div>
    )
}

export default Cdeals;