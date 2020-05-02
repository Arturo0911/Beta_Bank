const mysql = require('mysql');
const { database } = require('./credenciales');
const { promisify } = require('util');

const pool = mysql.createPool(database);


pool.getConnection((err, connection) => {
    if (err) {
        console.log(err.code);
    }
    if (connection) {
        connection.release();

    }
    console.log('Connection with database was successfully');
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;