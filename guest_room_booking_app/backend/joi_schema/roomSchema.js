const Joi = require('joi');

const roomSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Room name is required.',
    }),

    numBeds: Joi.number().integer().min(1).required().messages({
        'any.required': 'Number of beds is required.',
        'number.base': 'Number of beds must be a valid number.',
        'number.min': 'At least one bed is required.',
    }),

    minStay: Joi.number().integer().min(1).required().messages({
        'any.required': 'Minimum stay duration is required.',
        'number.base': 'Minimum stay duration must be a valid number.',
        'number.min': 'Minimum stay must be at least 1 day.',
    }),

    maxStay: Joi.number().integer().required().messages({
        'any.required': 'Maximum stay duration is required.',
        'number.base': 'Maximum stay duration must be a valid number.',
    }),

    rentPerDay: Joi.number().min(1).required().messages({
        'any.required': 'Rent per day is required.',
        'number.base': 'Rent per day must be a valid number.',
        'number.min': 'Rent per day cannot be negative or zero.',
    }),
});

module.exports = roomSchema;
