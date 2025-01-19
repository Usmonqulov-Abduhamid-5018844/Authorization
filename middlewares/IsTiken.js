const Jwt = require("jsonwebtoken")

const MidelWair = (req,res,nex)=>{
    let Token = req.header("Authorization")
    if(!Token){
        return res.send({message: "Not Authoraid"})
    }
    try{
        const data = Jwt.verify(Token, process.env.BCRYPT_PAROL)
        req.data = data
        nex()
    }
    catch(e){
        console.log(e);
        res.status(400).send({message: "Token Yaroqsiz"})
    }
}

module.exports = MidelWair