// my sql
const connection = require('../data/db.js');

// index
function index(req, res) {

    const sql = `
    SELECT 
       movies.*, AVG(reviews.vote) AS vote_average
    FROM 
       movies
    LEFT JOIN 
       reviews ON movies.id = reviews.movie_id
    GROUP BY 
       movies.id`;

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database connection failed' });

        res.json(results.map(result => ({
            ...result,
            imagePath: process.env.PUBLIC_PATH + 'movies-img/' + result.image
        })))

    })
}

// show
function show(req, res) {

    const { id } = req.params;

    const sql = 'SELECT * FROM movies WHERE id = ?';

    connection.query(sql, [id], (err, results) => {

        if (err) return res.status(500).json({ error: 'Database connection failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Movie not found' });

        const movie = {
            ...results[0],
            image: process.env.PUBLIC_PATH + 'movies-img/' + results[0].image
        }

        // reviews
        const sql = 'SELECT * FROM reviews WHERE movie_id = ?';

        connection.query(sql, [id], (err, results) => {

            if (err) {
                console.log(err);
            }

            movie.reviews = results;
            res.json(movie);
        })
    })

}

module.exports = {
    index,
    show
}