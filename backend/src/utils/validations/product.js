const Joi = require('joi');

const productValidation = Joi.object({
    name: Joi.string().min(5),
    id: Joi.number(),
});

module.exports = {
    productValidation,
};