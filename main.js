const express = require("express");
const ConnectDB = require("./config/db");
const Product = require("./router/Product.router")
const Categorie = require("./router/Categoriy.router")
const User = require("./router/User.router")
require("dotenv").config()

ConnectDB()
const app = express()
app.use(express.json())

app.use("/categorie", Categorie)
app.use("/product", Product)
app.use("/user", User)

app.get("*",  (req,res)=>{
    res.status(404).send({message: "Not Found"})
})
app.listen(process.env.PORT, ()=>{
    console.log(` Server ${process.env.PORT} da ishlamoqda`);
})
