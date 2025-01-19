const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const IsTiken = require("./IsTiken")
const PATH = path.join(__dirname,"/Upload")
const rout = express.Router()
rout.use(express.json())

if(!fs.existsSync(PATH)){
    fs.mkdirSync(PATH)
}
const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        let filenam = Date.now() + "-" + file.originalname
        cb(null, filenam)
    },
    destination:(req,file ,cb)=>{
        cb(null,PATH)
    }
})

const Uploud = multer({ storage })

rout.post("/",IsTiken, Uploud.single("file"), (req,res)=>{
    if(!req.file){
        return res.status(400).send({message: "Fayl yuklanmadi"})
    }
    res.status(200).send({file:req.file.filename})
})
rout.use("/img",express.static(PATH))

module.exports = rout