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
        <div className='bata'>
            <h1> Your Booking requests: </h1><br />
            
            {
                brprop.map((item, index) =>
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

export default Cbookreq;