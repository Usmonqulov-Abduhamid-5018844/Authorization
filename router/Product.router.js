const express = require("express")
const Product = require("../model/Product")
const Validation = require("../Validation/Product_Validation")
const ValidationPATCH = require("../Validation/Product_ValidationPATCH")

const rout = express.Router()

rout.get("/", async (req,res)=>{
    let data = await Product.find()
    res.status(200).send({data})
})
rout.post("/", async (req,res)=>{
    let {error, value} = Validation.validate(req.body)
    if(error){
        res.status(400).send({message: error.message})
        return 
    }
    let newD = new Product(value)
    await newD.save()
    res.status(201).send({message: "creted",data: newD})
})
rout.patch("/:id", async (req,res)=>{
    let {error, value} = ValidationPATCH.validate(req.body)
    if(error){
        res.status(400).send({messale: error.message})
        return;
    }  
    let newD = await Product.findByIdAndUpdate({_id: req.params.id}, value, {new: true})
    newD.save()
    res.status(202).send({message: "Update", data: newD})
})

rout.delete("/:id", async (req,res)=>{  
    let newD = await Product.findByIdAndDelete({_id : req.params.id})
    if(newD){
        res.status(202).send({message: "Delete", data: newD})
    }
    else{
        res.status(404).send({message: "Not Found ID"})
    }
})
module.exports = rout