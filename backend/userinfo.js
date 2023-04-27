const pool = require("./data");

const oinfo = async (req, res) => {
    if (req.params.id) {
        await pool.query('select username, name, street_name, city, pincode, phone_number from owner_details where id=$1', [req.params.id], (err, result) => {
            if (err) { console.log("Error while fetching owner info", err); }
            if (result) {
                res.status(200).json(result.rows);
            }
        })
    }
    else { res.json("no params received"); }
}

const cinfo = async (req, res) => {
    if (req.params.id) {
        await pool.query('select username, name, street_name, city, pincode, phone_number from customer_details where id=$1', [req.params.id], (err, result) => {
            if (err) { console.log("Error while fetching owner info", err); }
            if (result) {
                res.status(200).json(result.rows);
            }
        })
    }
    else { res.json("no params received"); }
}

module.exports = { oinfo, cinfo };