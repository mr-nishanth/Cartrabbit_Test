const User = require('../models/user.model');
const Room = require('../models/room.model');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const roomSchema = require('../joi_schema/roomSchema');
const isValidObjectId = require('../utils/isValidObjectId');
const updateRoomSchema = require('../joi_schema/updateRoomSchema');

/**
 * @description Get all rooms
 * @path {/api/v1/rooms}
 * @method {GET}
 * @access private
 */

exports.getAllRooms = catchAsyncErrors(async (req, res, next) => {
    const rooms = await Room.find().populate('owner', 'name').exec();
    if (rooms) {
        return res.status(200).json({
            message: 'All Rooms',
            success: true,
            roomsCount: rooms.length,
            rooms,
        });
    }
    return next(new ErrorHandler('No rooms found', 404));
});

/**
 * @description Create a room
 * @path {/api/v1/rooms}
 * @method {POST}
 * @access private
 */
exports.createRooms = catchAsyncErrors(async (req, res, next) => {
    const { error, value } = roomSchema.validate(req.body);

    if (error) {
        const validationErrors = error.details.map((err) =>
            err.message.replace(/"/g, '')
        );
        return res
            .status(400)
            .json({ success: false, message: `${validationErrors} [Joi]` });
    }

    let room = await Room.findOne({ name: value.name }).exec();
    if (room) {
        return next(new ErrorHandler('Room already Exists', 400));
    }
    room = await Room.create({
        ...value,
        owner: req.user._id,
    });
    if (room) {
        return res.status(201).json({
            message: 'Room Created Successfully',
            success: true,
            room,
        });
    }
    return next(new ErrorHandler('Room Creation Failed', 400));
});

/**
 * @description Get a room
 * @path {/api/v1/rooms/:id}
 * @method {GET}
 * @access private
 */

exports.getSpecificRoom = catchAsyncErrors(async (req, res, next) => {
    const validId = isValidObjectId(req.params.id);
    if (!validId) {
        return next(new ErrorHandler('Invalid Room Id', 400));
    }

    const room = await Room.findById(req.params.id)
        .populate('owner', 'name')
        .exec();
    if (room) {
        return res.status(200).json({
            message: 'Room',
            success: true,
            room,
        });
    }
    return next(new ErrorHandler('Room not found', 404));
});

/**
 * @description Update a room
 * @path {/api/v1/rooms/:id}
 * @method {PUT}
 * @access private
 */

exports.updateSpecificRoom = catchAsyncErrors(async (req, res, next) => {
    const validId = isValidObjectId(req.params.id);
    if (!validId) {
        return next(new ErrorHandler('Invalid Room Id', 400));
    }

    const { error, value } = updateRoomSchema.validate(req.body);
    console.log({ value });

    if (error) {
        const validationErrors = error.details.map((err) =>
            err.message.replace(/"/g, '')
        );
        return res
            .status(400)
            .json({ success: false, message: `${validationErrors} [Joi]` });
    }

    const room = await Room.findByIdAndUpdate(req.params.id, value, {
        new: true,
        runValidators: true,
    }).exec();

    if (room) {
        return res.status(200).json({
            message: 'Room Updated Successfully',
            success: true,
            room,
        });
    }
    return next(new ErrorHandler('Room Update Failed', 400));
});

/**
 * @description Delete a room
 * @path {/api/v1/rooms/:id}
 * @method {DELETE}
 * @access private
 */

exports.deleteSpecificRoom = catchAsyncErrors(async (req, res, next) => {
    const validId = isValidObjectId(req.params.id);
    if (!validId) {
        return next(new ErrorHandler('Invalid Room Id', 400));
    }

    const room = await Room.findByIdAndDelete(req.params.id).exec();
    if (room) {
        return res.status(200).json({
            message: 'Room Deleted Successfully',
            success: true,
        });
    }
    return next(new ErrorHandler('Room Not Found', 404));
});
