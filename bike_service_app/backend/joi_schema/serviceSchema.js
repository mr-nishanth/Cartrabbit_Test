const Joi = require('joi');

const serviceSchema = Joi.object({
    name: Joi.string().min(5).max(126).required().messages({
        'any.required': 'Service name is required.',
        'string.min': 'Service name must be at least 5 characters.',
        'string.max': 'Service name must be at most 126 characters.',
    }),
    description: Joi.string().min(10).max(512).required().messages({
        'any.required': 'Service description is required.',
        'string.min': 'Service description must be at least 10 characters.',
        'string.max': 'Service description must be at most 512 characters.',
    }),
    price: Joi.number().integer().min(1).required().messages({
        'any.required': 'Service price is required.',
        'number.base': 'Service price must be a valid number.',
        'number.min': 'Service price cannot be zero or negative.',
    }),
});

module.exports = serviceSchema;
