// my sql
const connection = require('../data/db.js');
const slugify = require('slugify');

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
        if (err) return res.status(500).json({ errorMessage: err.sqlMessage });

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
       movies.slug = ?
    `;

    connection.query(sql, [id], (err, results) => {

        if (err) return res.status(500).json({ errorMessage: err.sqlMessage });

        if (results.length === 0 || results[0]?.id === null) {

            return res.status(404).json({
                errorMessage: 'Movie not found',
                id
            })

        }

        const currentResult = results[0];

        const movie = {
            ...currentResult,
            imagePath: process.env.PUBLIC_PATH + 'movies-img/' + results[0].image
        }

        // reviews
        const sql = 'SELECT * FROM reviews WHERE movie_id = ?';

        connection.query(sql, [currentResult.id], (err, results) => {

            if (err) {
                console.log(err);
            }

            movie.reviews = results;
            res.json(movie);
        })
    })

}

// aggiungere nuova recensione
function storeReview(req, res) {

    const { id } = req.params;

    const { name, vote, text } = req.body;

    const sql = `
    INSERT INTO reviews (movie_id, name, vote, text)
    VALUES (?, ?, ? ,?)`;

    connection.query(sql, [id, name, vote, text], (err, results) => {

        if (err) return res.status(500).json({ errorMessage: err.sqlMessage });

    })

    res.status(201).json({
        id,
        name,
        vote,
        text
    })
}

// aggiungere nuovo film
function storeMovie(req, res) {

    const { title, director, abstract } = req.body;

    const imageName = req.file.filename;

    const sql = `
    INSERT INTO movies (title, director, abstract, image, slug)
    VALUES (?, ?, ?, ?, ?)`;

    const slug = slugify(title, {
        lower: true,
        trim: true
    })

    connection.query(sql, [title, director, abstract, imageName, slug], (err, results) => {

        if (err) return res.status(500).json({ errorMessage: err.sqlMessage });

    })

    res.status(201).json({
        message: 'Add a new movie'
    })

}

module.exports = {
    index,
    show,
    storeReview,
    storeMovie
}
