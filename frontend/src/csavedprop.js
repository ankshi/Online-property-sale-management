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
        <div className="bata">
            <h1>Your saved properties!!</h1>
            {
                listsprop.map((item, index) =>
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

                            <button className='jaja' onClick={() => bookreq(item)}>Request to book</button>
                        </table>
                    </span>
                )
            }
        </div>
    );
};



export default Oinfo;
