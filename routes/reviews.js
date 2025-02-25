const express = require('express');
const router = express.Router({ mergeParams: true });

const Farm = require('../models/farm');
const Review = require('../models/review');
const Product = require('../models/product');

const ExpressError = require('../utilities/ExpressError');
const wrapAsync = require('../utilities/catchAsync');

const { createReview } = require('../controllers/reviews');

router.post('/', createReview);

module.exports = router;