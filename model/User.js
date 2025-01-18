const { types, version } = require("joi");
const { default: mongoose } = require("mongoose");

const UserSchem = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    product_ID: {type: mongoose.Schema.Types.ObjectId, ref: "Product"}
},{versionKey: false});

const UserModel = mongoose.model("User", UserSchem);

module.exports = UserModel