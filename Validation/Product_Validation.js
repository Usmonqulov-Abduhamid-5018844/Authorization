const Joi = require("joi");

const Validation = Joi.object({
    name: Joi.string().required().max(20).min(2),
    price: Joi.number().required().positive(),
    color: Joi.string().optional(),
    img: Joi.string().required(),
    categorie: Joi.string().required()

})

module.exports = Validation