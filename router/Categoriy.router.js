const express = require("express")
const Categorie = require("../model/Categoriy");
const Validation = require("../Validation/Categorie_Validation");
const Validation_PATCH = require("../Validation/Categorie_ValidationPATCH");

const rout = express.Router()

rout.get("/", async (req,res)=>{
    let data = await Categorie.find()
    res.status(200).send({data})
})
rout.post("/", async (req,res)=>{
    let {error,value} = Validation.validate(req.body)
    if(error){
        res.status(400).send({message: error.message})
        return;
    }
    let newD = new Categorie(value);
    await newD.save();
    res.status(201).send({newD})
})
rout.patch("/:id", async (req,res)=>{
    let {error, value} = Validation_PATCH.validate(req.body)
    if(error){
        res.status(400).send({message: error.message})
        return;
    }
    let newD = await Categorie.findByIdAndUpdate({_id: req.params.id},value,{new: true});
    newD.save()
    res.status(201).send({newD})
})
rout.delete("/:id", async (req,res)=>{
    let Delete = await Categorie.findByIdAndDelete(req.params.id)
    if(Delete){
        res.status(202).send({delete: Delete})
    }
    else{
        res.status(404).send({message: "Not Found ID"})
    }
})
module.exports = rout