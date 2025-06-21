const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.NODE_DB_HOST,
    port: process.env.NODE_DB_PORT,
    database: process.env.NODE_DB_DATABASE,
    user: process.env.NODE_DB_USERNAME,
    password: process.env.NODE_DB_PASSWORD,
});

pool.connect()
    .then(() => console.log("Database is Connect!"))
    .catch(err => console.error('Database Connection Error:', err));

module.exports = pool;