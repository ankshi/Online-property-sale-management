const pool = require('./data.js');

const sfoptions = async (req, res) => {
    await pool.query('select * from properties', (error, result) => {
        if (result) {
            res.status(200).json(result.rows);
        }
        if (error) {
            console.log(error);
        }
    })
}

const searchdata = async (req, res) => {
    await pool.query('select * from properties where street_name ILIKE $1 OR city ILIKE $1 OR CAST(pincode as TEXT) ILIKE $1 OR property_type ILIKE $1 OR property_use ILIKE $1 OR residential_type ILIKE $1', ['%' + req.params.key + '%'], (error, result) => {
        if (result) {
            res.status(200).json(result.rows);
        }
        else {
            console.log(error);
        }
    })
}

module.exports = { sfoptions, searchdata };