const pool = require("./data");

const bookacc = async (req, res) => {
    const [cid, oid, pid] = req.body;
    await pool.query('update deals set status=$4 where cid=$1 and oid=$2 and pid=$3', [cid, oid, pid, '3'], (error, result) => {
        if (result) {
            res.status(200).json("Request accepted");
        }
        else {
            console.log(error);
        }
    })
}

module.exports = { bookacc };