const pool = require('./data.js');

const confirmdeal = async (req, res) => {
    const [cid, oid, pid] = req.body;
    await pool.query('select * from deals where cid = $1 and oid = $2 and pid = $3 and not exists(select * from deals where pid=$3 and status=$4)', [cid, oid, pid, '4'], (error, result) => {
        if (result.rows[0]) {
            if (result.rows[0].status == 3) {
                pool.query('update deals set status=$4 where cid = $1 and oid = $2 and pid = $3', [cid, oid, pid, '4'], (error, result1) => {
                    if (result1) { res.status(200).json("Deal is confirmed"); }
                    else { console.log(error); }
                })
            }
        }
        else { console.log(result); res.status(200).json("deal is confirmed with another customer"); }
    })
}

module.exports = { confirmdeal };