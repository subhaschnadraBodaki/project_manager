const Pool = require('pg').Pool

const {DATABASE_USER, DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT} = process.env

const pool = new Pool({
    user : DATABASE_USER,
    host : DATABASE_HOST,
    database : DATABASE_NAME,
    password : DATABASE_PASSWORD,
    port : DATABASE_PORT
})

module.exports = pool 