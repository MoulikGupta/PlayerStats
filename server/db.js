// const mysql = require("mysql2");

// const Pool = require("pg").Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "postgres123",
//     host: "localhost",
//     port: 5432,
//     database: "playerstatsviewer"
// })

// module.exports = pool;
const mysql = require("mysql2/promise");
require("dotenv").config({ path: '../.env' });


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
});

pool.getConnection()
    .then(connection => {
        console.log('Successfully connected to the database');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database:', err.message);
    });

module.exports = pool;
