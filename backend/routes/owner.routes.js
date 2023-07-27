const {
    getAllRooms,
    createRooms,
    getSpecificRoom,
    updateSpecificRoom,
    deleteSpecificRoom,
} = require('../controllers/owner.controller');
const { isAuthenticatedUser } = require('../middleware/authenticate');

const router = require('express').Router();

router.route('/rooms').get([isAuthenticatedUser, getAllRooms]);
router.route('/rooms').post([isAuthenticatedUser, createRooms]);

router
    .route('/rooms/:id')
    .get([isAuthenticatedUser, getSpecificRoom])
    .put([isAuthenticatedUser, updateSpecificRoom])
    .delete([isAuthenticatedUser, deleteSpecificRoom]);

module.exports = router;
