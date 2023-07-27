const router = require('express').Router();
const rateLimit = require('express-rate-limit');

const {
    registerUser,
    loginUser,
    logoutUser,
} = require('../controllers/auth.controllers');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 3, // 3 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

// AUTH ROUTES
router.route('/register').post(registerUser);
router.route('/login').post([limiter, loginUser]);
router.route('/logout').get(logoutUser);

module.exports = router;
