const {
    getAllBookings,
    createBookings,
} = require('../controllers/booking.controllers');
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require('../middleware/authenticate');

const router = require('express').Router();

router
    .route('/bookings')
    .get([isAuthenticatedUser, authorizeRoles('customer'), getAllBookings]);
router
    .route('/bookings/:id')
    .post([isAuthenticatedUser, authorizeRoles('customer'), createBookings]);

module.exports = router;
