const Booking = require('../models/booking.model');
const Room = require('../models/room.model');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const isValidObjectId = require('../utils/isValidObjectId');
const { calcDays } = require('../utils/calcDays');
const { formatDate } = require('../utils/formatDate');

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
    // Check if the room is present in the database
    let room = await Room.findById(roomId).exec();
    if (!room) {
        return next(new ErrorHandler('Room not found', 404));
    }

    // Check if the user has already booked the room
    const existingBooking = await Booking.findOne({
        roomId: roomId,
        customerId: customerId,
    }).exec();

    if (existingBooking) {
        const bookedDays = calcDays(
            existingBooking?.startDate,
            existingBooking?.endDate
        );
        const bookingStartDate = formatDate(existingBooking?.startDate);
        const bookingEndDate = formatDate(existingBooking?.endDate);
        return res.status(400).json({
            success: false,
            message: `You have already booked this room for ${bookedDays} days from ${bookingStartDate} to ${bookingEndDate}.`,
        });
    }

    // Check if the room is available for booking
    const checkStartDate = new Date(startDate);
    const checkEndDate = new Date(endDate);

    const overlappingBooking = await Booking.findOne({
        roomId: roomId,

        $or: [
            {
                startDate: { $lte: checkStartDate },
                endDate: { $gte: checkEndDate },
            },
            {
                startDate: { $lte: existingBooking?.startDate },
                endDate: { $gte: existingBooking?.endDate },
            },
        ],
    }).exec();

    if (overlappingBooking) {
        // Convert the days

        const bookedDays = calcDays(
            overlappingBooking?.startDate,
            overlappingBooking?.endDate
        );
        const bookingStartDate = formatDate(overlappingBooking?.startDate);
        const bookingEndDate = formatDate(overlappingBooking?.endDate);

        const overlappingBookingMessage = `The room is not available for the selected dates. It's booked for ${bookedDays} days from ${bookingStartDate} to ${bookingEndDate}.`;

        return res.status(400).json({
            success: false,
            message: overlappingBookingMessage,
        });
    }

    // Check the minimum and maximum stay duration of the room for the selected dates
    const minStay = room?.minStay;
    const maxStay = room?.maxStay;
    const selectedDays = calcDays(startDate, endDate);
    if (selectedDays < minStay) {
        return res.status(400).json({
            success: false,
            message: `Minimum stay duration is ${minStay} days.`,
        });
    }
    if (selectedDays > maxStay) {
        return res.status(400).json({
            success: false,
            message: `Maximum stay duration is ${maxStay} days.`,
        });
    }

    const booking = await Booking.create({
        roomId,
        customerId,
        startDate,
        endDate,
    });

    // Update the room with the booking id
    try {
        room.bookingId.push(booking._id);
        await room.save();
    } catch (error) {
        console.log({ error });
    }

    const bookingStartDate = formatDate(booking?.startDate);
    const bookingEndDate = formatDate(booking?.endDate);
    const bookedDays = calcDays(booking?.startDate, booking?.endDate);
    if (booking) {
        return res.status(201).json({
            message: `Room booked for ${bookedDays} days from ${bookingStartDate} to ${bookingEndDate}.`,
            success: true,
            booking,
        });
    }
    return next(new ErrorHandler('Room booking Failed', 400));
});
