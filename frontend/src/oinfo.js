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
        if (oinfo[0].username && getlprop[0].pincode) {
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
                        <h1>Welcome {item.name}</h1>
                        <h1>username: {item.username}</h1>
                        <h1>address: {item.street_name}</h1>
                        <h1>city: {item.city}</h1>
                        <h1>pincode: {item.pincode}</h1>
                        <h1>phonenumber: {item.phone_number}</h1>
                    </div>
                )
            }
            <h1> List of uploaded properties</h1>
            {
                lprop.map((item, index) => 
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
                        <form onSubmit={handlesubmit} >
                            <label hidden={!item.residential_type}>Upload image for property - <input type='file' onChange={handleimage} hidden={!item.residential_type}></input></label>
                            <button type='submit' hidden={!item.residential_type}>Upload</button>
                        </form>
                    </div>
                )
            }
        </div>
    );
};



export default Oinfo;
