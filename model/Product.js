const { default: mongoose } = require("mongoose");

const ProductSchem = mongoose.Schema({
    name: String,
    price: Number,
    color: String,
    categorie: {type: mongoose.Schema.Types.ObjectId, ref: "Categorie"}
},{versionKey: false})

const ProductModel = mongoose.model("Product", ProductSchem)

module.exports = ProductModel