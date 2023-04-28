import React, { useState, useEffect } from 'react';

const Addprop = () => {
    const oidgi = localStorage.getItem("owner");
    let oid = '';
    if (oidgi) {
        oid = JSON.parse(oidgi)[0];
    }
    const [ptype, setPtype] = useState('');
    const [puse, setPuse] = useState('');
    const [buyrental, setBuyrent] = useState('');
    const [sqftacres, setSqftacres] = useState('');
    const [areavalue, setAreavalue] = useState('');
    const [price, setPrice] = useState('');
    const [cyear, setCyear] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [rtpye, setRtype] = useState('');
    const [imagefile, setImage] = useState(null);
    let requiredvalue1 = false;
    let requiredvalue2 = false;

    const buyrent = ['Buy', 'Rental']
    const ptypes = ['Land', 'Building', 'Structure']
    const landuses = ['Agriculture', 'Forest and wildlife', 'Grazing', 'Office', 'Research and development', 'Storage', 'Vacant', 'Others']
    const buildinguses = ['Apartments', 'Border/Inspection Station', 'Commercial', 'Hospital', 'Industrial', 'Laboratories', 'Museum', 'Office', 'Other Institutional Uses', 'Outpatient Healthcare Facility', 'Prisons and Detention Centres', 'Residential', 'Service', 'Warehouses', 'Others']
    const structureuses = ['Communication Systems', 'Monuments and Memorials', 'Museum', 'Reclamation and Irrigation', 'Roads and Bridges', 'Service', 'Storage', 'Utility Systems', 'Others']
    const residentialtypes = ['Single Family', 'Double Family', 'Three Family', 'Four Family', 'Condo']

    let sptype = null;
    let puseoptions = null;
    let rtypeoptions = null;
    if (ptype === 'Land') {
        sptype = landuses;
    }
    else if (ptype === 'Building') {
        sptype = buildinguses;
    }
    else if (ptype === 'Structure') {
        sptype = structureuses;
    }
    else {
        sptype = null;
    }
    
    const handlefunction = async(event) => {
        await setPtype(event.target.value);
    };

    const handlefunction1 = async(event) => {
        await setPuse(event.target.value);
    };

    const handlefunction2 = async(event) => {
        await setBuyrent(event.target.value);
    };

    const handlefunction3 = async(event) => {
        await setSqftacres(event.target.value);
    };

    const handlefunction4 = async(event) => {
        const value = event.target.value;
        await setAreavalue(value);
    };

    const handlefunction5 = async(event) => {
        const value = event.target.value;
        await setPrice(value);
    };

    const handlefunction6 = async(event) => {
        const value = event.target.value;
        if (ptype === 'Building' || ptype === 'Structure') {
            await setCyear(value);
        }
    };

    const handlefunction7 = async(event) => {
        const value = event.target.value;
        await setAddress(value);
    };

    const handlefunction8 = async(event) => {
        const value = event.target.value;
        await setCity(value);
    };

    const handlefunction9 = async(event) => {
        const value = event.target.value;
        await setPincode(value);
    };

    const handlefunction10 = async(event) => {
        const value = event.target.value;
        if (puse === 'Residential') {
            await setBedrooms(value);
        }
    };

    const handlefunction12 = async(event) => {
        const value = event.target.value;
        await setRtype(value);
    };

    const handlefunction11 = async (event) => {
        let result = await fetch(`http://localhost:4000/addprop`, {
            method: 'post',
            body: JSON.stringify({ oid, ptype, puse, buyrental, areavalue, sqftacres, price, cyear, address, city, pincode, bedrooms, rtpye }),
            headers: {
                'Content-type': 'application/json',
                 authorization: ` ${oid} ${JSON.parse(localStorage.getItem("otoken"))}`
            }
        })
        result = await result.json();
        if (result) {
            alert(result);
        }
    };

    if (sptype) {
        puseoptions = sptype.map((item) => <option value={item}>{item}</option>)
    }

    if (puse === 'Residential') {
        rtypeoptions = residentialtypes.map((item) => <option value={item}>{item}</option>)
        requiredvalue2 = true;
    }

    if (ptype === 'Building' || ptype === 'Structure') { requiredvalue1 = true; }

    return (
        <div className="login">
            <form onSubmit={handlefunction11}>
                <h1>Add property</h1>
                <label>Enter Address: </label>
                <input type="text" required onChange={handlefunction7} placeholder='Enter Address'></input>
                <br />
                <label>Enter City: </label>
                <input type='text' required onChange={handlefunction8} placeholder='Enter City'></input>
                <br />
                <label>Enter Pincode: </label>
                <input type="number" required min='0' onChange={handlefunction9} placeholder='Enter Pincode'></input>
                <br />
                <label>Whether the property is arranged for rental or buy for customers: </label>
                <select required onChange={handlefunction2}>
                    <option value="" disabled selected hidden>Buy/Rent</option>
                    {
                        buyrent.map((item) =>
                            <option value={item}>{item}</option>
                        )
                    }
                </select>
                <br />
                <label>Enter Property type: </label>
                <select required onChange={handlefunction}>
                    <option value="" disabled selected hidden>Property Type</option>
                    {
                        ptypes.map((item) =>
                            <option value={item}>{item}</option>
                        )
                    }
                </select>
                <br />
                <label>Enter Property use: </label>
                <select required onChange={handlefunction1}>
                    <option value="" disabled selected hidden>Property Use</option>
                    {
                        puseoptions
                    }
                </select>
                <br />
                <label> Enter resitential type(Applicable only if property use is 'residential'): </label>
                <select onChange={handlefunction12} required={requiredvalue2}>
                    <option value={'NULL'} disabled selected hidden>Residential Type</option>
                    {
                        rtypeoptions
                    }
                </select>
                <br />
                <div>
                    <label>Enter the value of area(in square feet or acres)</label>
                    <select required onChange={handlefunction3}>
                        <option value="" disabled selected hidden>unit</option>
                        <option value="sq.ft.">sq.ft.</option>
                        <option value="acres">acres</option>
                    </select>
                    <input required type="float" min='0' onChange={handlefunction4} placeholder="Enter value"></input>
                </div>
                <label>Enter Sale Price(in dollars): </label>
                <input required type="float" min='0' onChange={handlefunction5} placeholder='Enter price of property'></input>
                <br />
                <label>Enter construction year: </label>
                <input type="number" min='0' onChange={handlefunction6} placeholder='Enter building construction year' required={requiredvalue1}></input>
                <br />
                <label>Enter number of bedrooms (applicable only for residential use): </label>
                <input type='number' min='1' max='15' onChange={handlefunction10} placeholder='Number of bedrooms' required={requiredvalue2}></input>
                <br />
                <input type='submit'></input>
        </form>
        </div>
    );
};



export default Addprop;
