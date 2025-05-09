// my sql
const mysql = require('mysql2');

// configurazioni my sql
const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'abcd',
    database: 'db_movies'
})

connection.connect((err) => {
    if (err) throw err;
    console.log('MySql connected')
})

module.exports = connection;