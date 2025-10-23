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

    const { slug } = req.params;

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

    connection.query(sql, [slug], (err, results) => {

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

    const { slug } = req.params;
    const { name, vote, text } = req.body;

    // prima prendo l'id numerico dal film
    connection.query('SELECT id FROM movies WHERE slug = ?', [slug], (err, results) => {

        if (err) return res.status(500).json({ errorMessage: err.sqlMessage });
        if (results.length === 0) return res.status(404).json({ errorMessage: 'Movie not found' });

        const movieIdNumeric = results[0].id;

        // poi inserisco la recensione
        connection.query('INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)',
            [movieIdNumeric, name, vote, text],
            (err, results) => {
                if (err) return res.status(500).json({ errorMessage: err.sqlMessage });

                res.status(201).json({
                    id: results.insertId,
                    name,
                    vote,
                    text
                });
            }
        );
    });
}


// aggiungere nuovo film
function storeMovie(req, res) {

    const { title, director, abstract, release_year } = req.body;

    // Controlla che multer abbia salvato l'immagine
    if (!req.file) {
        return res.status(400).json({ errorMessage: "Image file is required" });
    }

    const imageName = req.file.filename;

    const slug = slugify(title, {
        lower: true,
        trim: true
    });

    const sql = `
        INSERT INTO movies (title, director, abstract, release_year, image, slug)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(sql, [title, director, abstract, release_year, imageName, slug], (err, results) => {
        if (err) return res.status(500).json({ errorMessage: err.sqlMessage });

        res.status(201).json({
            message: 'Movie added successfully',
            id: results.insertId
        });
    });
}

module.exports = {
    index,
    show,
    storeReview,
    storeMovie
}
