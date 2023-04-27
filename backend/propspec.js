const pool = require("./data");

const propdetails = async (req, res) => {
    await pool.query('', (err, result) => {
        if (err) { console.log("error while fetching data", err) }
        if (result) {
            res.status(200).json(result.rows);
        }
    })
}

module.exports = { propdetails };