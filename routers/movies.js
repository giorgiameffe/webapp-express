// express
const express = require('express');
const router = express.Router();

// controller
const movieController = require('../controllers/movieController.js');

// index
router.get('/', movieController.index);

// show
router.get('/:id', movieController.show);

// store
router.post('/:id/reviews', movieController.storeReview);

module.exports = router;
