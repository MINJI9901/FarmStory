const express = require('express');
const router = express.Router();

const Farm = require('../models/farm');
const Review = require('../models/review');
const Product = require('../models/product');

const ExpressError = require('../utilities/ExpressError');
const wrapAsync = require('../utilities/catchAsync');
const { validateFarms } = require('../schemas');

const { getFarms, getNewFarmForm, createFarm, getEachFarm, getEditFarmForm, editFarm, deleteFarm } = require('../controllers/farms');

router.get('/', wrapAsync(getFarms));

router.get('/new', wrapAsync(getNewFarmForm));

router.post('/', validateFarms, wrapAsync(createFarm));
 
router.get('/:id', wrapAsync(getEachFarm));

router.get('/:id/edit', wrapAsync(getEditFarmForm));

router.put('/:id', validateFarms, wrapAsync(editFarm));

router.delete('/:id', wrapAsync(deleteFarm));

module.exports = router;