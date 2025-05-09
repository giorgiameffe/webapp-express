// my sql
const connection = require('../data/db.js');

// index
function index(req, res) {

    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database connection failed' })
        res.json(results);

    })
}

// show
function show(req, res) {

    // recuperare id
    const id = parseInt(req.params.id);

    // salvare in una variabile la query da utilizzare
    const sql = 'SELECT * FROM movies WHERE id = ?';

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database connection failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Movie not found' });
        res.json(results[0]);
    })
}

module.exports = {
    index,
    show
}