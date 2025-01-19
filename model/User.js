const { types, version } = require("joi");
const { default: mongoose } = require("mongoose");

const UserSchem = mongoose.Schema({
    name: String,
    email: String,
    password: String,
},{versionKey: false});

const UserModel = mongoose.model("User", UserSchem);

module.exports = UserModel