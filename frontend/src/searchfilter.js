import React, { useState, useEffect } from 'react';

const Searchfilter = () => {
    const [properties, setProperties] = useState([]);
    const [fbuyrent, setFbuyrent] = useState('');
    const [fptype, setFptype] = useState('');
    const [fpuse, setFpuse] = useState('');
    const [frtype, setRtype] = useState('');
    const [image, setImage] = useState(null);
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
        window.location.reload(false);
    }

    const handledownload = async (pid) => {
        let dimage = await fetch(`http://localhost:4000/image/${pid}`, {
            responseType: 'blob'
        })
        console.log(dimage);
        if (dimage.body === 'ReadableStream') {
            console.log("119");
            dimage = await dimage.json();
            if (dimage) {
                console.log('121');
            }
        }

        dimage = await dimage.blob;

        setImage(dimage);

        
    }

    return (
        <div className="login">
            <div>
                <div>
                    <h1> Welcome to 'FORTUNE SALE'</h1>
                    <br />
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
                    <h1 >Have a look on Propertiesss!!!!!</h1>
                    {
                        properties.filter(pusehandle).map((item, index) =>
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

                                {
                                    authcustomer ?
                                        <span>
                                                <span><button className='jaja' onClick={() => saveproperty(item)}>Save</button></span>
                                                <span><button className='jaja' onClick={() => bookproperty(item)}>Request to book</button></span>
                                        </span>
                                        :
                                        <div><br /></div>

                                }
                               
                                
                                <button className='jaja' onClick={() => handledownload(item.id)}>Click here to see property image</button>
                            {image && (
                                <div>
                                    <img src={image} alt="Downloaded file" />
                                </div>
                                    )}
                                </table>
                            </span>
                )}
                </div>
            </div>
        </div>
    );
};



export default Searchfilter;