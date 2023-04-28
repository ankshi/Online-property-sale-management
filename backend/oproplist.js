const pool = require("./data");

const proplist = async (req, res) => {
    if (req.params.oid) {
        await pool.query('select properties.id, street_name, city, pincode, buyrent, property_type, area, sqft_acres, property_use, price, bedrooms, construction_year, residential_type, filename from properties left join images on properties.id = images.pid where oid=$1', [req.params.oid], (error, result) => {
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

const imageretrieval = async (req, res) => {
    console.log(req.params.pid);
    await pool.query('select * from images where pid=$1', [req.params.pid], (error, result) => {
        if (result.rowCount > 0) {
            console.log(result.rowCount, '23');
            const file = result.rows[0];
            const filename = file.filename;
            const type = file.mime_type;
            const path = file.path;
            console.log(filename, type, path);
            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.setHeader('Content-type', type);

            res.sendFile(__dirname +'\\' + path);
        }
        else if (result.rowCount == 0) {
            console.log(result.rowCount, 35);
            res.status(200).json("no images uploaded for this property");
        }
        else {
            console.log(error);
        }
    })
}

module.exports = { proplist, imageretrieval };