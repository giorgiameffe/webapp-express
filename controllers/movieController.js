// my sql
const connection = require('../data/db.js');

// index
function index(req, res) {

    const { search } = req.query;

    const preparedParams = [];

    let sql = `
    SELECT 
       movies.*, ROUND(AVG(reviews.vote), 2) AS reviews_vote
    FROM 
       movies
    LEFT JOIN 
       reviews ON movies.id = reviews.movie_id
    `;

    if (search) {

        sql += `WHERE title LIKE ? OR director LIKE ?  OR abstract  LIKE ?`;
        preparedParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += 'GROUP BY movies.id'

    connection.query(sql, preparedParams, (err, results) => {
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

    const sql =
        `SELECT 
       movies.*, ROUND(AVG(reviews.vote), 2) AS reviews_average
    FROM 
       movies
    LEFT JOIN 
       reviews ON movies.id = reviews.movie_id
    WHERE 
       movies.id = ?
    `;

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