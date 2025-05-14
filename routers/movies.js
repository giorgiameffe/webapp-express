// express
const express = require('express');
const router = express.Router();

// controller
const movieController = require('../controllers/movieController.js');

// index
router.get('/', movieController.index);

// show
router.get('/:id', movieController.show);

// store per nuova recensione
router.post('/:id/reviews', movieController.storeReview);

// store per nuovo libro
router.post('/', movieController.store)

module.exports = router;
