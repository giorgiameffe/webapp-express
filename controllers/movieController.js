// my sql
const connection = require('../data/db.js');

// index
function index(req, res) {

    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) {

            return res.status(500).json({
                error: 'Database connection failed'
            })
        }

        res.json(results);
    })

}

// show
function show(req, res) {
    res.send('Show single movie');
}

module.exports = {
    index,
    show
}