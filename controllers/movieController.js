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