const pool = require("./data")

const oinfo = async (req, res) => {
    if (req.params.id) {
        res.status(200).json("sending oinfo");
    }
    else { res.json("no params received"); }
}

const cinfo = async (req, res) => {
    if (req.params.id) {
        res.status(200).json("sending cinfo");
    }
    else { res.json("invalid credentials"); }
}

module.exports = { oinfo, cinfo };