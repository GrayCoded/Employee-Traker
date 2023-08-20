const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306
});

connection.connect(err => {
    if (err) {
        throw new Error('Error connecting to the database: ' + err.message);
    }
    console.log('Connected to the database!');
});
module.exports = connection;