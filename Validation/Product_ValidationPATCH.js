const Joi = require("joi");

const Validation = Joi.object({
    name: Joi.string().optional().max(20).min(2),
    price: Joi.number().optional().positive(),
    color: Joi.string().optional(),
    img: Joi.string().optional(),

})
module.exports = Validation