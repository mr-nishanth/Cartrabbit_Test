const Booking = require('../models/booking.model');
const Service = require('../models/service.model');
const User = require('../models/user.model');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const isValidObjectId = require('../utils/isValidObjectId');
const sendEmail = require('../utils/sendMail');
/**
 * @description Get all bookings
 * @path {/api/v1/bookings}
 * @method {GET}
 * @access private
 */

exports.getAllBookings = catchAsyncErrors(async (req, res, next) => {
    const bookings = await Booking.find()
        .populate('customer', 'name email')
        .exec();
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
    const serviceId = req.body?.serviceId;
    const customerId = req.user._id;
    const { date } = req.body;

    const validId = isValidObjectId(serviceId);
    if (!validId) {
        return next(new ErrorHandler('Invalid Service Id', 400));
    }

    // Check if the service is present in the database
    let service = await Service.findById(serviceId)
        .populate('ownerId', 'name email')
        .exec();
    if (!service) {
        return next(new ErrorHandler('Service not found', 404));
    }

    // Check if the user is present in the database
    let user = await User.findById(customerId).select('name').exec();

    // Check if the user has already booked the same service on the same day
    const existingBooking = await Booking.findOne({
        customer: customerId,
        service: serviceId,
        date,
    }).exec();
    if (existingBooking) {
        return next(
            new ErrorHandler('You have already booked this service', 400)
        );
    }

    const booking = await Booking.create({
        customer: customerId,
        service: serviceId,
        date,
    });

    // TODO:
    // Send Email to Owner ✅
    const message = `Service name : ${
        service?.name
    } \n Booked Date : ${new Date(date).toDateString()} \n Customer name : ${
        user?.name
    }`;
    if (booking) {
        try {
            await sendEmail({
                email: service?.ownerId?.email,
                subject: 'Bike Service Status',
                message,
            });
            return res.status(200).json({
                success: true,
                ownerMessage: `Email sent to Owner Email: ${service?.ownerId?.email}`,
                message: `${service.name} booked successfully`,
                booking,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
    return next(new ErrorHandler('Service booking Failed', 400));
});

/**
 * @description Update booking status
 * @path {/api/v1/bookings}
 * @method {PATCH}
 * @access private
 */

exports.updateBookingStatus = catchAsyncErrors(async (req, res, next) => {
    const bookingId = req.body?.bookingId;
    const { status } = req.body;

    const isValidBookingId = isValidObjectId(bookingId);
    if (!isValidBookingId) {
        return next(new ErrorHandler('Invalid Booking Id', 400));
    }

    // Check if the booking is present in the database
    let booking = await Booking.findById(bookingId)
        .populate('customer', 'name email')
        .populate('service', 'name')
        .exec();
    console.log({ booking });
    if (!booking) {
        return next(new ErrorHandler('Booking not found', 404));
    }

    if (booking.status === 'Completed') {
        return next(
            new ErrorHandler(`You have already Completed this booking`, 400)
        );
    }

    if (booking.status === status) {
        return next(
            new ErrorHandler(
                `You have already booking marked as ${status}`,
                400
            )
        );
    }

    if (booking.status === 'Pending' && status === 'Completed') {
        return next(
            new ErrorHandler(
                `You can not mark as Completed before ReadyForDelivery`,
                400
            )
        );
    }

    if (booking.status === 'ReadyForDelivery' && status === 'Pending') {
        return next(
            new ErrorHandler(
                `You can not mark as Pending after ReadyForDelivery `,
                400
            )
        );
    }

    booking.status = status;
    booking = await booking.save();

    if (booking) {
        // TODO:
        // Send Email to Customer  ✅
        if (booking.status === 'ReadyForDelivery') {
            const message = `Service name : ${
                booking?.service?.name
            } \n Booked Date : ${new Date(
                booking?.date
            ).toDateString()} \n Status : Ready for Delivery`;

            try {
                sendEmail({
                    email: booking?.customer?.email,
                    subject: 'Bike Service Status',
                    message,
                });
                return res.status(200).json({
                    success: true,
                    message: `Email sent to customer email: ${booking?.customer?.email} `,
                });
            } catch (error) {
                return next(new ErrorHandler(error.message, 500));
            }
        }

        return res.status(201).json({
            message: `Services Status set to Completed`,
            success: true,
            booking,
        });
    }
    return next(new ErrorHandler('Service booking Failed', 400));
});

/**
 * @description Get all bookings by ownerId
 * @path {/api/v1/bookings/owner}
 * @method {GET}
 * @access private
 */

exports.getAllBookingByOwnerID = catchAsyncErrors(async (req, res, next) => {
    const ownerId = req.user._id;
    try {
        // Fetch all bookings associated with the ownerId
        const bookings = await Booking.find()
            .populate({
                path: 'service',
                match: { ownerId: ownerId },
                select: 'name ownerId',
            })
            .populate('customer', 'name email')
            .exec();

        const filteredBookings = bookings.filter(
            (booking) => booking.service !== null
        );
        if (filteredBookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No bookings found for the specified ownerId.',
            });
        }
        return res.status(200).json({
            success: true,
            ownerId,
            bookingsCount: filteredBookings.length,
            bookings: filteredBookings,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching bookings for the specified ownerId.',
        });
    }
});
