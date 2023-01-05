const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const otp = require("../../models/marchentOTP")
const marchantVerifyOTP = async (req, res, next) => {
  
  try {

    const resOTP=req.body.OTP;
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer") ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.status(422).json({
        message: "Please provide the token",
      });
    }
    const theToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(theToken, "the-super-strong-secrect");
    console.log(decoded);
    const email=decoded.mail;
    console.log(email);
    const check=await otp.findOne({where:{email:email}})
    const dbOTP=check.OTP;
    if(resOTP==dbOTP){
      const theToken = jwt.sign({email,status:"true"},'the-super-strong-secrect',{ expiresIn: '1h' });
      res.status(200).json({
        message:"OTP matched please LOging",
        token:theToken
    })}
    else{
          res.json({
            message:"Your ORP is not correct"
          })
    }
  } catch (err) {
    next(err);
  }
};

module.exports={
    marchantVerifyOTP
};