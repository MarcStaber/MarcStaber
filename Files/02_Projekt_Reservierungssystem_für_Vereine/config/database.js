const mariadb = require('mariadb');


const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
});

// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
    pool: pool
});
