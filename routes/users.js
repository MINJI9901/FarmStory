const express = require('express');
const router = express.Router();

const ExpressError = require('../utilities/ExpressError');
const wrapAsync = require('../utilities/catchAsync');
const { validateUsers } = require('../schemas');

const { login, signUp, ghostSignUp, logout } = require('../controllers/users');

router.post('/login', login);
router.post('/signup', validateUsers, signUp);
router.post('/signup/fake', ghostSignUp);
router.get('/logout', logout);

module.exports = router;