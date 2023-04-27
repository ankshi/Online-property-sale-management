import React, { useState, useEffect } from 'react';

const Searchfilter = () => {
    const [properties, setProperties] = useState([]);
    const [fbuyrent, setFbuyrent] = useState('');
    const [fptype, setFptype] = useState('');
    const [fpuse, setFpuse] = useState('');
    const [frtype, setRtype] = useState('');
    const authcustomer = localStorage.getItem("customer");
    let cid = '';
    if (authcustomer) {
        cid = JSON.parse(authcustomer)[0];
    }

    useEffect(() => {
        lprop();
    }, [])

    const buyrent = ['Buy', 'Rental']
    const ptypes = ['Land', 'Building', 'Structure']
    const landuses = ['Agriculture', 'Forest and wildlife', 'Grazing', 'Office', 'Research and development', 'Storage', 'Vacant', 'Others']
    const buildinguses = ['Apartments', 'Border/Inspection Station', 'Commercial', 'Hospital', 'Industrial', 'Laboratories', 'Museum', 'Office', 'Other Institutional Uses', 'Outpatient Healthcare Facility', 'Prisons and Detention Centres', 'Residential', 'Service', 'Warehouses', 'Others']
    const structureuses = ['Communication Systems', 'Monuments and Memorials', 'Museum', 'Reclamation and Irrigation', 'Roads and Bridges', 'Service', 'Storage', 'Utility Systems', 'Others']
    const residentialtypes = ['Single Family', 'Double Family', 'Three Family', 'Four Family', 'Condo']

    const saveproperty = async (property) => {
        let result = await fetch(`http://localhost:4000/saveprop`, {
            method: 'Post',
            body: JSON.stringify([cid, property.oid, property.id]),
            headers: {
                'Content-type': 'application/json',
                 authorization: ` ${cid} ${JSON.parse(localStorage.getItem("ctoken"))}`
            }

        })
        result = await result.json();
        if (result === 1 || result>1) {
            alert('property already saved/listed in pending or confirmed deals');
        }
        else if (result){
            alert(result);
        }
    }

    const bookproperty = async(property) => {
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

    const lprop = async () => {
        let oinfo = await fetch(`http://localhost:4000/sfilter`);
        oinfo = await oinfo.json();
        setProperties(oinfo);
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            console.log(key);
            let result = await fetch(`http://localhost:4000/search/${key}`);
            result = await result.json();
            setProperties(result);
        }
        else {
            lprop();
        }
    }

    const fptypehandlefunction = (event) => {
        setFptype(event.target.value);
    }

    const fpusehandlefunction = (event) => {
        setFpuse(event.target.value);
    }

    const fbuyrenthandlefunction = (event) => {
        setFbuyrent(event.target.value);
    }

    const frtypehandlefunction = (event) => {
        setRtype(event.target.value);
    }

    const pusehandle = (prop) => {
        if (fptype || fpuse || fbuyrent || frtype) {
            return (prop.property_use === fpuse || prop.property_type === fptype || prop.buyrent === fbuyrent || prop.residential_type === frtype);
        }
        else {
            return true;
        }
    }

    const handlefilter = () => {
        setFbuyrent('');
        setFptype('');
        setFpuse('');
        setRtype('');
    }

    return (
        <div className="login">
            <div>
                <div>
                    <h1>search and filter options</h1>
                    <input type="text" placeholder="search address, property type, property use, residential type" onChange={searchHandle}></input>
                    <h4>Filter options</h4>
                    <label>Buy/rent: </label>
                    {
                        buyrent.map((item) => 
                            <span>
                                <input type='radio' onChange={fbuyrenthandlefunction} checked={fbuyrent === item} value={item}></input>
                                <label>{item}</label>
                            </span>
                        )
                    }
                    <br />
                    <label>Property type: </label>
                    {
                        ptypes.map((item) =>
                            <span>
                                <input type='radio' onChange={fptypehandlefunction} checked={fptype === item} value={item}></input>
                                <label>{ item }</label>
                            </span>
                        )
                    }
                    <br />
                    <label>Property uses: <pre>land uses - </pre></label>
                    {
                        landuses.map((item) =>
                            <span>
                                <input type='radio' onChange={fpusehandlefunction} checked={fpuse === item} value={item}></input>
                                <label>{item}</label>
                            </span>
                        )
                    }
                    <label><pre>building uses - </pre></label>
                    {
                        buildinguses.map((item) =>
                            <span>
                                <input type='radio' onChange={fpusehandlefunction} checked={fpuse === item} value={item}></input>
                                <label>{item}</label>
                            </span>
                        )
                    }
                    <label><pre>structure uses - </pre></label>
                    {
                        structureuses.map((item) =>
                            <span>
                                <input type='radio' onChange={fpusehandlefunction} checked={fpuse === item} value={item}></input>
                                <label>{item}</label>
                            </span>
                        )
                    }
                    <label><pre>residential types - </pre></label>
                    {
                        residentialtypes.map((item) => 
                            <span>
                                <input type='radio' onChange={frtypehandlefunction} checked={frtype === item} value={item}></input>
                                <label>{item}</label>
                            </span>
                        )
                    }
                    </div>
                <button type="button" onClick={handlefilter}>Remove filter</button>
                <div>
                    <h1>property details</h1>
                    {
                        properties.filter(pusehandle).map((item, index) =>
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
                            {
                                authcustomer ?
                                    <div>
                                    <h4><button onClick={() => saveproperty(item)}>Save</button></h4>
                                        <h4><button onClick={() => bookproperty(item)}>Booking Request</button></h4>
                                    </div>
                                    :
                                    <div><br /></div>

                            }
                        </div>
                )}
                </div>
            </div>
        </div>
    );
};



export default Searchfilter;