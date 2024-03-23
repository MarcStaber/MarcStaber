const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Rosie123',
    database: 'rfv',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = Object.freeze({
    pool: pool
});