const marchant=require("../../models/marchantModel")

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const loginMarchant = async (req, res) => {

    
    let email=req.body.email;
    let password=req.body.password;
    let result = await marchant.findOne({ where: { email: email }})
    console.log(result.password)
    let pass=result.password;
    let compar=await bcrypt.compare(password,pass)
    
    if(compar==false){
        res.send("Please provide correct password")
    }
    else{
        const theToken = jwt.sign({id:result.id},'the-super-strong-secrect',{ expiresIn: '1h' });
        res.json({
            token:theToken,
            message:"you have successfully logged in As a merchant "
        })
    }
}
module.exports={loginMarchant};