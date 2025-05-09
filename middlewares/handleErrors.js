function handleErrors(err, _, res, _) {

    res.status(500).json({
        status: 500,
        error: err.message
    })

}

module.exports = handleErrors;