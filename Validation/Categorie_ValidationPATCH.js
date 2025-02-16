const Joi = require("joi")

const Validation = Joi.object({
    name: Joi.string().optional().max(20).min(2),
    img: Joi.string().optional()
})

module.exports = Validation