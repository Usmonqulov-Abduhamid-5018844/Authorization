const express = require("express")
const Product = require("../model/Product")
const Validation = require("../Validation/Product_Validation")
const ValidationPATCH = require("../Validation/Product_ValidationPATCH")
const IsToken = require(("../middlewares/IsTiken"))

const rout = express.Router()

rout.get("/", async (req,res)=>{
    let data = await Product.find()
    res.status(200).send({data})
});
rout.get("/owners/:id", async (req,res)=>{
    let {id} = req.params.id 
    let filter = await Product.find({user_id: {$ne:id}})
    if(!filter){
       return res.status(404).send({message: "Product Not Found"})
    }
    res.status(200).send({filter})
 })
rout.get("/sort/:S", async (req,res)=>{
    let X = req.params.S * 1
    try{
        let data = await Product.find({}).sort({name:X})
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
            let data = await Product.find({}).skip(start).limit(end)
            return res.status(200).send({data})
        }
        if(pagin){
            let start = (pagin - 1) * 10;
            let end = start + tage
            let data = await Product.find({}).skip(start).limit(end)
            return res.status(200).send({data})
        }
        if(tage){
            let data = await Product.find({}).limit(tage)
            return res.status(200).send({data})
        }
    }
    catch(e){
        res.status(400).send({message: "error"})
        console.log(e);
    }
})
rout.post("/",IsToken, async (req,res)=>{
    let {error, value} = Validation.validate(req.body)
    if(error){
        res.status(400).send({message: error.message})
        return 
    }
    let user_id = req.data.id
    value ={
        ...value,
        user_id,
    }
    let newD = new Product(value)
    await newD.save()
    res.status(201).send({message: "creted",data: newD})
})
rout.patch("/:id",IsToken, async (req,res)=>{
    let {error, value} = ValidationPATCH.validate(req.body)
    if(error){
        res.status(400).send({messale: error.message})
        return;
    }  
    let newD = await Product.findByIdAndUpdate({_id: req.params.id}, value, {new: true})
    newD.save()
    res.status(202).send({message: "Update", data: newD})
})
rout.delete("/:id",IsToken, async (req,res)=>{  
    let newD = await Product.findByIdAndDelete({_id : req.params.id})
    if(newD){
        res.status(202).send({message: "Delete", data: newD})
    }
    else{
        res.status(404).send({message: "Not Found ID"})
    }
})
module.exports = rout