const pool = require("./data");

const proplist = async (req, res) => {
    if (req.params.oid) {
        await pool.query('select * from properties where oid=$1', [req.params.oid], (error, result) => {
            if (result) {
                res.status(200).json(result.rows);
            }
            else {
                console.log(error);
            }
        })
    }
    else {
        console.log("owner id not sent");
    }
}

module.exports = { proplist };