const Joi = require('joi');

const updateRoomSchema = Joi.object({
    name: Joi.string(),
    numBeds: Joi.number().integer().min(1).messages({
        'any.required': 'Number of beds is required.',
        'number.base': 'Number of beds must be a valid number.',
    }),
    minStay: Joi.number().integer().min(1).messages({
        'number.base': 'Minimum stay duration must be a valid number.',
        'number.min': 'Minimum stay must be at least 1 day.',
    }),

    maxStay: Joi.number().integer().messages({
        'number.base': 'Maximum stay duration must be a valid number.',
    }),
    rentPerDay: Joi.number().min(1).messages({
        'number.base': 'Rent per day must be a valid number.',
        'number.min': 'Rent per day cannot be negative or zero.',
    }),
});

module.exports = updateRoomSchema;
