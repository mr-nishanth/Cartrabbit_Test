const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema(
    {
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required.'],
            validate: {
                validator: function (value) {
                    // Custom validation function to ensure the selected date is today or in the future
                    return value >= new Date().setHours(0, 0, 0, 0); // Set time to midnight for date comparison only
                },
                message: 'Start date cannot be in the past.',
            },
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required.'],
            validate: {
                validator: function (value) {
                    return value >= new Date().setHours(0, 0, 0, 0);
                },
                message: 'End date cannot be in the past.',
            },
        },
    },
    { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
