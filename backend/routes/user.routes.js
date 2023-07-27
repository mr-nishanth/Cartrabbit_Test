const {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    getSpecificUser,
    updateSpecificUser,
    deleteSpecificUser,
} = require('../controllers/user.controller');
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require('../middleware/authenticate');

const router = require('express').Router();

// USER PROFILE ROUTES
router.route('/myprofile').get([isAuthenticatedUser, getMyProfile]);

router.route('/update').put([isAuthenticatedUser, updateMyProfile]);

// ADMIN ROUTES
router
    .route('/admin/users')
    .get([isAuthenticatedUser, authorizeRoles('admin'), getAllUsers]);

router
    .route('/admin/user/:id')
    .get([isAuthenticatedUser, authorizeRoles('admin'), getSpecificUser])
    .put([isAuthenticatedUser, authorizeRoles('admin'), updateSpecificUser])
    .delete([isAuthenticatedUser, authorizeRoles('admin'), deleteSpecificUser]);

module.exports = router;
