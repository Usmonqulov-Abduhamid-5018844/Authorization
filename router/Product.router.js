const express = require("express")
const Product = require("../model/Product")
const rout = express.Router()

rout.get("/", async (req,res)=>{
    res.send("Product")
})

module.express = rout