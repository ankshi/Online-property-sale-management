import React, { useState } from 'react';
import { useEffect } from 'react';

const Oinfo = () => {
    const oidgi = localStorage.getItem("owner");
    let oid = '';
    if (oidgi) {
        oid = JSON.parse(oidgi)[0];
    }

    const [info, setInfo] = useState([]);
    const [lprop, setListprop] = useState([]);
    const [image, setImage] = useState([]);

    useEffect(() => {
        getinfo();
    }, []);

    const getinfo = async() => {
        let oinfo = await fetch(`http://localhost:4000/oinfo/${oid}`, {
            headers: {
                authorization: ` ${oid} ${JSON.parse(localStorage.getItem("otoken"))}`
            }
        });
        let getlprop = await fetch(`http://localhost:4000/oprop/${oid}`, {
            headers: {
                authorization: ` ${oid} ${JSON.parse(localStorage.getItem("otoken"))}`
            }
        });
        oinfo = await oinfo.json();
        getlprop = await getlprop.json();
        if (oinfo[0].username || getlprop[0].pincode) {
            setInfo(oinfo);
            setListprop(getlprop);
        }
        else { alert(oinfo); }
    }

    const handleimage = async (event) => {
       await setImage(event.target.files[0]);
    }

    const handlesubmit = async () => {
        let submit = await fetch(`http://localhost:4000/fileupload`, {
            headers: {
                authorization: ` ${oid} ${JSON.parse(localStorage.getItem("otoken"))}`
            }
        });
        submit = submit.json();
        if (submit) {
            alert(submit);
        }
    }

    return (
        <div className="login">
            {
                info.map((item, index) => 
                    <div>
                        <h1>Holaa!! {item.name}</h1>
                        <br />
                        <h1>About you!</h1>
                        <h2>Username: {item.username}</h2>
                        <h2>Door-no: {item.street_name}</h2>
                        <h2>City: {item.city}</h2>
                        <h2>Pincode: {item.pincode}</h2>
                        <h2>Phonenumber: {item.phone_number}</h2>
                    </div>
                )
            }
            <h1> Your list of properties:</h1>
            <form onSubmit={handlesubmit} >
            {
                lprop.map((item, index) => 
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
                   
                            <label >Upload image for property - <input type='file' onChange={handleimage} hidden={!item.residential_type}></input></label>
                            <button type='submit' >Upload</button>
                            </table>
                    </span>
                )
            }
            </form>
        </div>
    );
};



export default Oinfo;
