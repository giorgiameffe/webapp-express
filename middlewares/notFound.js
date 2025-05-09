// funzione per Not Found 404
function notFound(req, res, next) {

    res.status(404).json({
        status: 404,
        message: 'Page Not Found'
    })

}

module.exports = notFound;