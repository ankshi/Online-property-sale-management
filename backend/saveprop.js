const pool = require('./data.js');

const saveprop = async (req,res) => {
    const [ cid, oid, pid ] = req.body;
    await pool.query('select * from deals where cid=$1 and oid=$2 and pid=$3', [cid, oid, pid], (error, result) => {
        if (result.rowCount == 0) {
            pool.query('insert into deals values($1,$2,$3,$4)', [cid, oid, pid, '1'], (error, result1) => {
                if (result1) { res.status(200).json("successfully saved"); }
                else { console.log(error); }
            })
        }
        else if (result.rowCount == 1) {
            res.status(200).json(result.rows[0].status);
        }
        else {
            console.log(error);
        }
    })
}

const bookprop = async (req, res) => {
    const [cid, oid, pid] = req.body;
    await pool.query('select * from deals where cid = $1 and oid = $2 and pid = $3', [cid, oid, pid], (error, result) => {
        if (result.rowCount == 0) {
            pool.query('insert into deals values($1,$2,$3,$4)', [cid, oid, pid, '2'], (error, result1) => {
                if (result1) { res.status(200).json("successfully sent request"); }
                else { console.log(error); }
            })
        }
        else if (result.rows[0].status == 1) {
            pool.query('update deals set status=$4 where cid = $1 and oid = $2 and pid = $3', [cid, oid, pid, '2'], (error, result1) => {
                if (result1) { res.status(200).json("successfully sent request"); }
                else { console.log(error); }
            })
        }
        else if (result.rows[0].status > 2) {
            res.status(200).json("check pending/confirmed deals");
        }
        else { console.log(error); }
    })
}

module.exports = { saveprop, bookprop };