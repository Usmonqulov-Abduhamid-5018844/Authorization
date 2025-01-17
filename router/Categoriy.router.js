const express = require("express")
const Categorie = require("../model/Categoriy")
const rout = express.Router()

rout.get("/", async (req,res)=>{
    let data = await Categorie.find()
    res.send({data})
})

module.exports = rout