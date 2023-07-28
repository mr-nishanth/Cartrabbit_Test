const Booking = require('../models/booking.model');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const isValidObjectId = require('../utils/isValidObjectId');

/**
 * @description Get all bookings
 * @path {/api/v1/bookings}
 * @method {GET}
 * @access private
 */

exports.getAllBookings = catchAsyncErrors(async (req, res, next) => {
    const bookings = await Booking.find().populate('customerId', 'name').exec();
    if (bookings) {
        return res.status(200).json({
            message: 'All Bookings',
            success: true,
            bookingsCount: bookings.length,
            bookings,
        });
    }
    return next(new ErrorHandler('No Bookings found', 404));
});

/**
 * @description Create a booking
 * @path {/api/v1/bookings}
 * @method {POST}
 * @access private
 */

exports.createBookings = catchAsyncErrors(async (req, res, next) => {
    const roomId = req.params?.id;
    const customerId = req.user._id;
    const { startDate, endDate } = req.body;
    const validId = isValidObjectId(roomId);
    if (!validId) {
        return next(new ErrorHandler('Invalid Room Id', 400));
    }

    // Check if the user has already booked the room
    const existingBooking = await Booking.findOne({
        roomId: roomId,
        customerId: customerId,
    }).exec();

    if (existingBooking) {
        return res.status(400).json({
            success: false,
            message: 'You have already booked this room.',
        });
    }
    // Check if the room is available for booking
    const checkStartDate = new Date(startDate);
    const checkEndDate = new Date(endDate);

    const overlappingBooking = await Booking.findOne({
        roomId: roomId,
        startDate: { $lte: checkStartDate },
        endDate: { $gte: checkEndDate },
    }).exec();

    let overlappingBookingMessage;
    if (overlappingBooking) {
        const daysAvailable = Math.floor(
            (overlappingBooking.endDate - overlappingBooking.startDate) /
                (1000 * 60 * 60 * 24)
        );

        overlappingBookingMessage = `The room is not available for the selected dates. It's booked for ${daysAvailable} days from ${overlappingBooking.startDate.toISOString()} to ${overlappingBooking.endDate.toISOString()}.`;

        return res.status(400).json({
            success: false,
            message: overlappingBookingMessage,
        });
    }

    const booking = await Booking.create({
        roomId,
        customerId,
        startDate,
        endDate,
    });

    if (booking) {
        return res.status(201).json({
            message: 'Room booking  Successful',
            success: true,
            booking,
            overlap: overlappingBookingMessage,
        });
    }
    return next(new ErrorHandler('Room booking Failed', 400));
});
