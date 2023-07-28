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
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required.'],
        },
    },
    { timestamps: true }
);

// Define a middleware function to update the bookingExpiresIn field in the corresponding Room Model
bookingSchema.post('save', async function () {
    // Get the Room document using the roomId
    const Room = mongoose.model('Room');
    const room = await Room.findById(this.roomId);

    if (room) {
        room.bookingExpiresIn = this._id;
        await room.save();
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
