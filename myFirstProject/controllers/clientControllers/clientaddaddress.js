const jwt=require("jsonwebtoken")
const client=require("../../models/clientmodel")
let clientaddaddress=async(req,res,next)=>{
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer") ||
        !req.headers.authorization.split(" ")[1]
      ){
        res.json({
            message:"Please prived a Valid token "
        })
      }
      else{
        const theToken=req.headers.authorization;
        const check=jwt.verify(theToken,'the-super-strong-secrect')
        const id=check.id;
        const add=req.body.address;
        const addaddress=await client.update({address:add},{where:{id:id}})
        if(addaddress==0){
            res.json({message:"Please provide address"})
        }
        else{
            res.json({message:"Address is uploaded successfully DASHBOARD!!!!!!!!!!!!!!!"})
        }
      }
}

module.exports=clientaddaddress