const pool = require("./data");

const lsprop = async (req, res) => {
    await pool.query('select  cid, b.oid, id, street_name, city, pincode, buyrent, property_type, area, sqft_acres, property_use, price, bedrooms, construction_year, residential_type from deals a join properties b on a.pid=b.id where cid=$1 and status=$2', [req.params.cid,'1'], (error, result) => {
        if (result.rowCount > 0) {
            res.status(200).json(result.rows);
        }
        else if (result.rowCount == 0) {
            res.status(200).json('');
        }
        else { console.log(error); }
    })
}

const brprop = async (req, res) => {
    await pool.query('select  cid, b.oid, id, street_name, city, pincode, buyrent, property_type, area, sqft_acres, property_use, price, bedrooms, construction_year, residential_type from deals a join properties b on a.pid=b.id where cid=$1 and status=$2', [req.params.cid, '2'], (error, result) => {
        if (result.rowCount > 0) {
            res.status(200).json(result.rows);
        }
        else if (result.rowCount == 0) {
            res.status(200).json('');
        }
        else { console.log(error); }
    })
}

const deals = async (req, res) => {
    await pool.query('select  cid, status, b.oid, id, street_name, city, pincode, buyrent, property_type, area, sqft_acres, property_use, price, bedrooms, construction_year, residential_type, name, phone_number from deals a join (select a.oid, a.id, a.street_name, a.city, a.pincode, buyrent, property_type, area, sqft_acres, property_use, price, bedrooms, construction_year, residential_type, name, phone_number from properties a, owner_details b where a.oid = b.id) b on a.pid=b.id where cid=$1 and status in ($2,$3)', [req.params.cid, '3', '4'], (error, result) => {
        if (result.rowCount > 0) {
            res.status(200).json(result.rows);
        }
        else if (result.rowCount == 0) {
            res.status(200).json('');
        }
        else { console.log(error); }
    })
}

const obrlist = async (req, res) => {
    await pool.query('select  cid, username, phone_number, b.oid, b.id, b.street_name, b.city, b.pincode from (select * from deals join customer_details on deals.cid=customer_details.id) a join properties b on a.pid=b.id where a.oid=$1 and status=$2', [req.params.oid, '2'], (error, result) => {
        if (result.rowCount > 0) {
            res.status(200).json(result.rows);
        }
        else if (result.rowCount == 0) {
            res.status(200).json('');
        }
        else {
            console.log(error);
        }
    })
}

const odeals = async (req, res) => {
    await pool.query('select cid, username, phone_number, status, b.oid, b.id, b.street_name, b.city, b.pincode from (select * from deals join customer_details on deals.cid=customer_details.id) as a join properties b on a.pid=b.id where a.oid=$1 and status in ($2,$3);', [req.params.oid, '3', '4'], (error, result) => {
        if (result.rowCount > 0) {
            res.status(200).json(result.rows);
        }
        else if (result.rowCount == 0) {
            res.status(200).json('');
        }
        else { console.log(error); }
    })
}

module.exports = { lsprop, brprop, deals, odeals, obrlist };