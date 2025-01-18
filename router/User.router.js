const express = require("express");
const User = require("../model/User");
const Validation_R = require("../Validation/Register_Validation");
const Validation_L = require("../Validation/Login_Validation")
const Token = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const rout = express.Router()

rout.post("/register", async (req,res)=>{
    let {error, value} = Validation_R.validate(req.body);
    if(error){
        res.status(400).send({message: error.message})
        return;
    }
    let {name, email, password} = value
    let Email = await User.findOne({ email })
    let Name = await User.findOne({ name })
    if(Email){
        res.status(200).send({message: "Email ro'yhadan o'tgan"})
        return;
    }
    if(Name){
        res.status(200).send({message: "Bunday user nameli foydalanuvchi mavjud"})
        return;
    }
    let passwod_shifer = bcrypt.hashSync(password, 12)

    let newD = await User({name, email, password:passwod_shifer})
    newD.save()
    res.status(201).send({message: "Creted", data: newD})

})
rout.post("/login", async (req,res)=>{
    let {error, value} = Validation_L.validate(req.body)
    if(error){
        res.status(400).send({message: error.message})
        return 
    } 
    let user = await User.findOne({email:value.email});
    if(!user){
        res.status(404).send({message: "Not Faund User"})
        return 
    }
    let Heshed = bcrypt.compareSync(value.password, user.password)
    if(!Heshed){
        res.status(400).send({message: "Password Noto'g'ri kritildi"}) 
        return  
    }
    res.send("KO")

})

rout.get("/", async (req,res)=>{
    let data = await User.find()
    res.status(200).send({message: data})
})
module.exports = rout