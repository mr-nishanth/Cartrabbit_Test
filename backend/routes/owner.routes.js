const {
    getAllRooms,
    createRooms,
    getSpecificRoom,
    updateSpecificRoom,
    deleteSpecificRoom,
    getAllRoomsByOwnerId,
} = require('../controllers/owner.controller');
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require('../middleware/authenticate');
const { upload } = require('../utils/multer');

const router = require('express').Router();

router
    .route('/rooms/customer')
    .get([isAuthenticatedUser, authorizeRoles('customer'), getAllRooms]);

router
    .route('/rooms')
    .get([isAuthenticatedUser, authorizeRoles('owner'), getAllRoomsByOwnerId]);
router
    .route('/rooms')
    .post([
        isAuthenticatedUser,
        authorizeRoles('owner'),
        upload.single('image'),
        createRooms,
    ]);

router
    .route('/rooms/:id')
    .get([
        isAuthenticatedUser,
        authorizeRoles('owner', 'customer'),
        getSpecificRoom,
    ])
    .put([isAuthenticatedUser, authorizeRoles('owner'), updateSpecificRoom])
    .delete([isAuthenticatedUser, authorizeRoles('owner'), deleteSpecificRoom]);

module.exports = router;
