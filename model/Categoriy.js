const mongoose = require("mongoose");


const CategoriSchem = mongoose.Schema({
    name: String,
    img: String,
},{versionKey: false})

const CategorieModel = mongoose.model("Categorie", CategoriSchem)

module.exports = CategorieModel