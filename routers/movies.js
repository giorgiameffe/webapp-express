// express
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer.js');

// controller
const movieController = require('../controllers/movieController.js');

// index
router.get('/', movieController.index);

// show
router.get('/:id', movieController.show);

// store per nuovo libro
router.post('/', upload.single('image'), movieController.storeMovie)

// store per nuova recensione
router.post('/:id/reviews', movieController.storeReview);

module.exports = router;
