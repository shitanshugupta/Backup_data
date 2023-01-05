const jwt=require("jsonwebtoken")
const marchant=require("../../models/marchantModel")

let marchatInfo=async(req,res,next)=>{
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
        const theToken=req.headers.authorization.split(" ")[1];
        const check=jwt.verify(theToken,'the-super-strong-secrect')
        const id=check.id;
        const data={
        companyName:req.body.companyName,
        productType:req.body.productType,
        gstNumber:req.body.gstNumber
        }
        const marchantupdateinfo=await marchant.update(data,{where:{id:id}});
        if(marchantupdateinfo==true){
            res.json({
                message:"Your information is uploaded Successfully"
            })
        }
        else{
            res.json({
                message:"Unable to upload your information"
            })
        }
      }
}

module.exports=marchatInfo