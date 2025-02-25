const express = require('express');
const router = express.Router({ mergeParams: true });

const Farm = require('../models/farm');
const Review = require('../models/review');
const Product = require('../models/product');

const ExpressError = require('../utilities/ExpressError');
const wrapAsync = require('../utilities/catchAsync');

const { getProducts, getEachProduct, getNewProductForm, createProduct, addToCart, addToFavorite } = require('../controllers/products');

router.get('/products', getProducts);
router.get('/products/:id', getEachProduct);
router.get('/farms/:id/products/new', getNewProductForm);
router.post('/farms/:id/products', createProduct);

router.get('/products/:id/cart', addToCart);
router.get('/products/:id/favorite', addToFavorite);

module.exports = router;