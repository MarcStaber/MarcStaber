const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Rosie123',
    database: 'prototype',
});

// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
    pool: pool
});