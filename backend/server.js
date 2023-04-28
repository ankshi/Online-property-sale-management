const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pool0 = require("./verify.js");
const pool1 = require("./logindetails");
const pool2 = require("./signup.js");
const pool3 = require("./userinfo.js");
const pool4 = require("./propspec.js");
const pool5 = require("./addprop.js");
const pool6 = require("./sfilter.js");
const pool7 = require("./saveprop.js");
const pool8 = require("./propdetails.js");
const pool9 = require("./confirmdeal.js");
const pool10 = require("./bookacc.js");
const pool11 = require("./oproplist.js");
const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cors());

app.post('/ologin', pool1.ologinid);
app.post('/clogin', pool1.cloginid);
app.post('/osignup', pool2.osignup);
app.post('/csignup', pool2.csignup);
app.get('/oinfo/:id/', pool0.verifyotoken, pool3.oinfo);
app.get('/cinfo/:id/', pool0.verifyctoken, pool3.cinfo);
app.get('/getpropdetails', pool4.propdetails);
app.post('/addprop', pool0.verifyotoken, pool5.addprop);
app.get('/sfilter', pool6.sfoptions);
app.get('/search/:key', pool6.searchdata);
app.post('/saveprop', pool0.verifyctoken, pool7.saveprop);
app.post('/bookreq', pool0.verifyctoken, pool7.bookprop);
app.get('/lsprop/:cid', pool0.verifyctoken, pool8.lsprop);
app.get('/brprop/:cid', pool0.verifyctoken, pool8.brprop);
app.get('/cdeals/:cid', pool0.verifyctoken, pool8.deals);
app.post('/confirm1', pool0.verifyotoken, pool9.confirmdeal);
app.post('/confirm2', pool0.verifyctoken, pool9.confirmdeal);
app.get('/odeals/:oid', pool0.verifyotoken, pool8.odeals);
app.get('/olbreq/:oid', pool8.obrlist);
app.post('/bookacc', pool0.verifyotoken, pool10.bookacc);
app.post('/fileupload', pool0.verifyotoken, upload.single('image'), pool5.fileupload);
app.get('/oprop/:oid', pool0.verifyotoken, pool11.proplist);
app.get('/image/:pid', pool11.imageretrieval);

app.listen(4000, function check(error) {
    if (error) { console.log("ERROR............"); }
    else { console.log("started"); }
});