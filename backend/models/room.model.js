const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: [true, 'Room name is required.'],
        },

        numBeds: {
            type: Number,
            required: [true, 'Number of beds is required.'],
            min: [1, 'At least one bed is required.'],
        },
        photos: {
            type: [String],
            required: [true, 'At least one photo is required.'],
        },
        minStay: {
            type: Number,
            min: [1, 'Minimum stay must be at least 1 day.'],
            required: [true, 'Minimum stay duration is required.'],
        },
        maxStay: {
            type: Number,
            required: [true, 'Maximum stay duration is required.'],
        },
        rentPerDay: {
            type: Number,
            required: [true, 'Rent per day is required.'],
            min: [0, 'Rent per day cannot be negative.'],
        },

        bookingExpiryIn: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
