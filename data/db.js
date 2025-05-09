// my sql
const mysql = require('mysql2');

// configurazioni my sql
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) throw err;
    console.log('MySql connected')
})

module.exports = connection;