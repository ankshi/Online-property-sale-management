const express = require("express");
const cors = require("cors");
const pool = require("./logindetails");
const app = express();

app.use(express.json());
app.use(cors());

app.post('/ologin', pool.ologinid);
app.post('/clogin', pool.cloginid);

app.listen(4000, function check(error) {
    if (error) { console.log("ERROR............"); }
    else { console.log("started"); }
});