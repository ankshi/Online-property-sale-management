const bcrypt = require("bcrypt");
const pool = require('./data.js');

const ologinid = async (req, res) => {
    const { uname, password } = req.body;
    if (uname && password) {
        pool.query('select * from student where ID=$1', [uname], (error, result) => {
            if (error) { console.log("error occured while fetching data", error); }
            if (result.rowCount == 1) {
                const matches = bcrypt.compare(password, result.rows[0].name);
                if (matches) {
                    res.status(200).json(result.rows[0]);
                }
                else { res.status(200).json("Username and password do not match"); }
            }
        })
    }
    else { res.json("invalid credentials"); }
}

const cloginid = async (req, res) => {
    const { uname, password } = req.body;
    if (uname && password) {
        pool.query('select * from student where ID=$1', [uname], (error, result) => {
            if (error) { console.log("error occured while fetching data", error); }
            if (result.rowCount == 1) {
                const matches = bcrypt.compare(password, result.rows[0].name);
                if (matches) {
                    res.status(200).json(result.rows[0]);
                }
                else { res.status(200).json("Username and password do not match"); }
            }
        })
    }
    else { res.json("invalid credentials"); }
}

module.exports = { ologinid, cloginid };