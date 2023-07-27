const User = require('../models/user.model');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

/**
 * @description Get currently logged in user details
 * @param {/api/v1/myprofile} req
 * @param {*} res
 * @param {*} next
 */

exports.getMyProfile = catchAsyncErrors(async (req, res, next) => {
    console.log('GetUserProfile', req.body);
    // get the user details from the database with the id from the token
    const user = await User.findById(req.user.id).exec();

    //  return error if user does not exist in the database with the id from the token (user is not logged in)
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    // return user details if user exists in the database with the id from the token (user is logged in)
    return res.status(200).json({
        success: true,
        user,
    });
});

/**
 * @description Update currently logged in user profile
 * @param {/api/v1/update} req
 * @param {*} res
 * @param {*} next
 */

exports.updateMyProfile = catchAsyncErrors(async (req, res, next) => {
    let newUserData = {
        name: req.body?.name,
        email: req.body?.email,
    };

    // get the user details from the database with the id from the token
    const user = await User.findByIdAndUpdate(req.user?.id, newUserData, {
        new: true, // return the updated user details to the user
        runValidators: true, // run the validators on the updated user details as well
    }).exec();

    //  return error if user does not exist in the database with the id from the token (user is not logged in)
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    return res.status(200).json({ success: true, user });
});

// * ======================== ADMIN =============================

/**
 * @description Get all users
 * @param {/api/v1/admin/users} req
 * @param {*} res
 * @param {*} next
 */

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    // get all the users from the database
    const users = await User.find().exec();
    // return error if users does not exist in the database (no users in the database)
    if (!users) {
        return next(new ErrorHandler('No users found', 404));
    }
    return res.status(200).json({
        success: true,
        users,
    });
});

/**
 * @description Get specific user details
 * @param {/api/v1/admin/user/:id} req
 * @param {*} res
 * @param {*} next
 */

exports.getSpecificUser = catchAsyncErrors(async (req, res, next) => {
    // get the id from the url
    const { id } = req.params;
    // get the user details from the database with the id from the url
    const user = await User.findById(id).exec();
    // return error if users does not exist in the database (no users in the database)
    if (!user) {
        return next(new ErrorHandler(`User not found with this id ${id}`, 404));
    }
    return res.status(200).json({
        success: true,
        user,
    });
});

/**
 * @description Update specific user details
 * @param {/api/v1/admin/user/:id} req
 * @param {*} res
 * @param {*} next
 */

exports.updateSpecificUser = catchAsyncErrors(async (req, res, next) => {
    // get the id from the url
    /**
     * TODO: add validation for the role field
     *
     */
    const { id } = req.params;
    const newUserData = {
        name: req.body?.name,
        email: req.body?.email,
        role: req.body?.role,
    };

    // get the user details from the database with the id from the token
    const user = await User.findByIdAndUpdate(id, newUserData, {
        new: true, // return the updated user details to the user
        runValidators: true, // run the validators on the updated user details as well
    }).exec();

    //  return error if user does not exist in the database with the id from the token (user is not logged in)
    if (!user) {
        return next(new ErrorHandler(`User not found with this id ${id}`, 404));
    }

    return res.status(200).json({ success: true, user });
});

/**
 * @description Delete specific user details
 * @param {/api/v1/admin/user/:id} req
 * @param {*} res
 * @param {*} next
 */

exports.deleteSpecificUser = catchAsyncErrors(async (req, res, next) => {
    // get the id from the url
    const { id } = req.params;
    // get the user details from the database with the id from the token
    const user = await User.findById(id).exec();

    //  return error if user does not exist in the database with the id from the token (user is not logged in)
    if (!user) {
        return next(new ErrorHandler(`User not found with this id ${id}`, 404));
    }

    // delete the user from the database
    await user.remove();

    return res.status(200).json({ success: true });
});
