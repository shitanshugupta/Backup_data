const client=require("../../models/clientmodel")

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const loginClient = async (req, res) => {

    
    let email=req.body.email;
    let password=req.body.password;
    let result = await client.findOne({ where: { email: email }})
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
            message:"you have successfully logged in as a client"
        })
    }
}
module.exports={loginClient};