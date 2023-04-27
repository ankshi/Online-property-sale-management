const pool = require("./data");

const addprop = async (req, res) => {
    const oid = req.body.oid;
    const ptype = req.body.ptype;
    const puse = req.body.puse;
    const buyrental = req.body.buyrental;
    const areavalue = req.body.areavalue;
    const sqft = req.body.sqftacres;
    const price = req.body.price;
    let cyear = null;
    if (req.body.cyear) { cyear = req.body.cyear; }
    const address = req.body.address;
    const city = req.body.city;
    const pincode = req.body.pincode;
    let bedrooms = null;
    if (req.body.bedrooms) { bedrooms = req.body.bedrooms; }
    let rtype = null;
    if (req.body.rtpye) { rtype = req.body.rtpye; }
    await pool.query('INSERT INTO properties(oid, street_name, city, pincode, buyrent, property_type, area, sqft_acres, property_use, price, bedrooms, construction_year, residential_type) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)', [oid, address, city, pincode, buyrental, ptype, areavalue, sqft, puse, price, bedrooms, cyear, rtype], (err, result) => {
        if (result) { console.log(result); res.status(200).json('property successfully added'); }
        if (err) { console.log(err); res.status(200).json('error while adding property'); }
    })
}

const fileupload = async (req, res) => {
    console.log(req.body);
} 

module.exports = { addprop, fileupload };