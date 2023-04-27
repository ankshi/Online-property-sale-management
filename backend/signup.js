const pool = require("./data.js");
const bcrypt = require("bcrypt");

const osignup = async(req, res) => {
    const { ID, password, name, address, city, pincode, phone } = req.body;
    const salted_rounds = 10;
    const hash = await bcrypt.hash(password, salted_rounds);
    await pool.query('select * from owner_details where username=$1', [ID],  (error, result) => {
        if (result.rowCount == 0) {
            pool.query('INSERT INTO owner_details( username, password, name, street_name, city, pincode, phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7)', [ID, hash, name, address, city, pincode, phone], (error, result) => {
                if (result.rowCount == 1) {
                    res.status(200).json("Account created successfully");
                }
                else { console.log(error); res.status(200).json("Got error on creating account"); }
            })
        }
        else if (result.rowCount > 0) {
            res.status(200).json("cannot create account - error: 'username already exists'");
        }
        else { console.log(error); }
    })
}

const csignup = async (req, res) => {
    const { ID, password, name, address, city, pincode, phone } = req.body;
    const salted_rounds = 10;
    const hash = await bcrypt.hash(password, salted_rounds);
    await pool.query('select * from customer_details where username=$1', [ID], (error, result) => {
        if (result.rowCount == 0) {
            pool.query('INSERT INTO customer_details( username, password, name, street_name, city, pincode, phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7)', [ID, hash, name, address, city, pincode, phone], (error, result) => {
                if (result.rowCount == 1) {
                    res.status(200).json("Account created successfully");
                }
                else { console.log(error); res.status(200).json("Got error on creating account"); }
            })
        }
        else if (result.rowCount > 0) {
            res.status(200).json("cannot create account - error: 'username already exists'");
        }
        else { console.log(error); }
    })
}

module.exports = { osignup, csignup }