const mongoose = require("mongoose");
require("dotenv").config()
async function ConnectDb() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("ConnectDB");
    }catch(e){
        console.log(e);
    }
}

module.exports = ConnectDb