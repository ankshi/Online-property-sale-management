const data = require("./config.js");
const Jwt = require("jsonwebtoken");

function verifyotoken(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        token1 = token.split(' ')[1];
        Jwt.verify(token1, data.ojwtkey, (error, valid) => {
            if (error) {
                res.status(200).json("Invalid token");
            }
            else if (valid){
                next();
            }
        })
    }
    else {
        res.status(200).json("No token sent");
    }
}

function verifyctoken(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        token1 = token.split(' ')[1];
        Jwt.verify(token1, data.cjwtkey, (error, valid) => {
            if (error) {
                res.status(200).json("Invalid token");
            }
            else if (valid) {
                next();
            }
        })
    }
    else {
        res.status(200).json("No token sent");
    }
}

module.exports = { verifyotoken, verifyctoken };