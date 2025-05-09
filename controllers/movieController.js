// my sql
const connection = require('../data/db.js');

// index
function index(req, res) {
    res.send('Show all movies');
}

// show
function show(req, res) {
    res.send('Show single movie');
}

module.exports = {
    index,
    show
}