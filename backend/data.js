const data = require("./config.js");
const Pool = require("pg").Pool;

const pool = new Pool({
    user: data.user,
    password: data.password,
    host: data.host,
    port: data.port,
    database: data.database
})

const query = (text, params, callback) => { return pool.query(text, params, callback); }

module.exports = { query }