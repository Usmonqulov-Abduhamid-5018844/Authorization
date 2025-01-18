const Joi = require("joi")

const Validation = Joi.object({
    email: Joi.string().required().min(10).max(35),
    password: Joi.string().required().min(8).max(30),
})
module.exports = Validation