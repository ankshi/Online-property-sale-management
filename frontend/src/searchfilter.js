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
                    <h1 className='search'>Explore and sort here!</h1>
                    <input className='button' type="text" placeholder="Search....... address, property type, property use, residential type" onChange={searchHandle}></input>
                    <h1 className='search'>Sort here!</h1>
                    <label className='text'>Buy/rent: </label>
                    <select className='dropdown' onChange={fbuyrenthandlefunction}>
                        <option className='text' value="" disabled selected hidden>Buy/Rent</option>
                        {
                        buyrent.map((item) => 
                            <option>{item}</option>
                        )
                    }
                    </select>                    
                    <br />
                    <br />
                    <label className='text'>Property type: </label>
                    <select className='dropdown' onChange={fptypehandlefunction}>
                        <option value="" disabled selected hidden>Type</option> 
                        {
                            ptypes.map((item) => 
                            <option>{item}</option>
                            )
                        }
                    </select>
                    <br />
                    <label className='text'>Property uses: Land uses-</label>
                    <select className='dropdown' onChange={fpusehandlefunction}>
                        <option value="" disabled selected hidden>Usetype</option>
                        {
                            landuses.map((item) => 
                            <option>{item}</option>
                            )
                        }
                    </select>
                    
                    <label className='text'> Building uses-</label>
                    <select className='dropdown' onChange={fpusehandlefunction}>
                        <option value="" disabled selected hidden>Type</option>
                        {
                            buildinguses.map((item) => 
                            <option>{item}</option>
                            )
                        }
                    </select>
                    
                    <label className='text'> Structure uses -</label>
                    <select className='dropdown' onChange={fpusehandlefunction}>
                        <option value="" disabled selected hidden>UseType</option>
                        {
                            structureuses.map((item) => 
                            <option>{item}</option>
                            )
                        }
                    </select>
                    
                    <label className='text'> Residential types -</label>
                    <select className='dropdown' onChange={frtypehandlefunction} >
                        <option value="" disabled selected hidden>Types</option>
                        {
                            residentialtypes.map((item) => 
                            <option>{item}</option>
                            )
                        }
                    </select>
                    
                    </div>
                    
                    <br />
                <button className='button' type="button" onClick={handlefilter}>Remove filter</button>
                <div>
                    <h1>Propertiesss!!!!!</h1>
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