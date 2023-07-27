const User = require('../models/user.model');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');

/**
 * @description Register a new user
 * @path {/api/v1/register} req
 */

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    console.log('Register User', req.body);
    const { name, email, password, mobile, role } = req.body;

    let user = await User.findOne({ email }).exec();

    if (user) {
        return next(new ErrorHandler('Email already Exists', 400));
    }

    user = await User.create({ name, email, password, mobile, role });

    return res.status(201).json({
        message: 'User Registration Successful',
        success: true,
        user,
    });
});

/**
 * @description Login a user
 * @param {/api/v1/login} req
 * @param {*} res
 * @param {*} next
 */
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    console.log('LoginUser', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }

    //   check if user exists in the database by email address and return error if it does not exist in the database
    const user = await User.findOne({ email }).select('+password').exec();

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    //   check if password is correct or not
    if (!(await user.isValidatePassword(password))) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken({ userObj: user, statusCode: 200, response: res });
});
/**
 * @description Logout a user
 * @param {/api/v1/logout} req
 * @param {*} res
 * @param {*} next
 */
exports.logoutUser = (req, res, next) => {
    /**
     * TODO - Implement logout functionality
     * 1. Clear cookie
     * 2. Clear session
     * 3. Clear local storage
     * 4. Redirect to login page
     * 5. Show success message
     */
    // * Check if user is logged in
    return res
        .status(200)
        .cookie('token', null, {
            expires: new Date(Date.now()), // set cookie to expire in 1 second
            httpOnly: true,
        })
        .json({
            success: true,
            message: 'Logged out',
        });
};
