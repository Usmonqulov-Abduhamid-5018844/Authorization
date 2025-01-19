const mongoose = require("mongoose");
const { type } = require("../Validation/Register_Validation");

const ProductSchem = mongoose.Schema({
    name: String,
    price: Number,
    color: String,
    img: String,
    categorie: {type: mongoose.Schema.Types.ObjectId, ref: "Categorie"},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
},{versionKey: false})

const ProductModel = mongoose.model("Product", ProductSchem)

module.exports = ProductModel