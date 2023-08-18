const Joi = require('joi');

const saleValidation = Joi.object({
    quantity: Joi.number().min(1),
    productId: Joi.number().integer(),
});

module.exports = {
    saleValidation,
};