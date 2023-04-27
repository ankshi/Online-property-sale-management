const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const data = require("./config.js");
const pool = require('./data.js');
const ologinid = async (req, res) => {
    const { uname, password } = req.body;
    if (uname && password) {
        await pool.query('select * from owner_details where username=$1', [uname], (error, result) => {
            if (result.rowCount > 0) {
                bcrypt.compare(password, result.rows[0].password, (error, result1) => {
                    if (result1) {
                        Jwt.sign({ result }, data.ojwtkey, { expiresIn: "2h" }, (error, token) => {
                            if (token) {
                                res.status(200).json({ owner: result.rows[0], auth: token });
                            }
                            else if (error) {
                                console.log(error); res.status(200).json("error occured during login");
                            }
                        })
                    }
                    else if (!result1) {
                        res.status(200).json("Username and password do not match"); 
                    }
                });
            }
            else if (result.rowCount == 0) {
                res.status(200).json("incorrect username");
            }
            else { console.log(error); }
        })
    }
    else { res.status(200).json("invalid credentials"); }
}

const cloginid = async (req, res) => {
    const { uname, password } = req.body;
    if (uname && password) {
        await pool.query('select * from customer_details where username=$1', [uname], (error, result) => {
            if (result.rowCount > 0) {
                bcrypt.compare(password, result.rows[0].password, (error, result1) => {
                    if (result1) {
                        Jwt.sign({ result }, data.cjwtkey, { expiresIn: "2h" }, (error, token) => {
                            if (token) {
                                res.status(200).json({ customer: result.rows[0], auth: token });
                            }
                            else if (error) {
                                console.log(error); res.status(200).json("error occured during login");
                            }
                        })
                    }
                    else if (!result1) {
                        res.status(200).json("Username and password do not match");
                    }
                });
            }
            else if (result.rowCount == 0) {
                res.status(200).json("incorrect username");
            }
            else {
                console.log(error);
            }
        })
    }
    else { res.status(200).json("invalid credentials"); }
}
    

module.exports = { ologinid, cloginid };