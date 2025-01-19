const express = require("express")
const Categorie = require("../model/Categoriy");
const Validation = require("../Validation/Categorie_Validation");
const Validation_PATCH = require("../Validation/Categorie_ValidationPATCH");
const IsToken = require("../middlewares/IsTiken");

const rout = express.Router()
rout.get("/", async (req,res)=>{
    let data = await Categorie.find({})
    res.status(200).send({data})
})
rout.get("/sort/:S", async (req,res)=>{
    let X = req.params.S * 1
    try{
        let data = await Categorie.find({}).sort({name:X})
        res.status(200).send({data})
    }
    catch(e){
        res.status(400).send({message:"error 1 or -1"})
    }
})
rout.get("/pagination", async (req,res)=>{
    let {pagin, tage} = req.query
    try{
        if(pagin && tage){
            let start = (pagin - 1) * tage;
            let end = start + tage
            let data = await Categorie.find({}).skip(start).limit(end)
            return res.status(200).send({data})
        }
        if(pagin){
            let start = (pagin - 1) * 10;
            let end = start + tage
            let data = await Categorie.find({}).skip(start).limit(end)
            return res.status(200).send({data})
        }
        if(tage){
            let data = await Categorie.find({}).limit(tage)
            return res.status(200).send({data})
        }
    }
    catch(e){
        res.status(400).send({message: "error"})
        console.log(e);
    }
})
rout.post("/",IsToken, async (req,res)=>{
    let {error,value} = Validation.validate(req.body)
    if(error){
        res.status(400).send({message: error.message})
        return;
    }
    let newD = new Categorie(value);
    await newD.save();
    res.status(201).send({newD})
})
rout.patch("/:id",IsToken, async (req,res)=>{
    let {error, value} = Validation_PATCH.validate(req.body)
    if(error){
        res.status(400).send({message: error.message})
        return;
    }
    let newD = await Categorie.findByIdAndUpdate({_id: req.params.id},value,{new: true});
    newD.save()
    res.status(201).send({newD})
})
rout.delete("/:id",IsToken, async (req,res)=>{
    let Delete = await Categorie.findByIdAndDelete(req.params.id)
    if(Delete){
        res.status(202).send({delete: Delete})
    }
    else{
        res.status(404).send({message: "Not Found ID"})
    }
})
module.exports = rout