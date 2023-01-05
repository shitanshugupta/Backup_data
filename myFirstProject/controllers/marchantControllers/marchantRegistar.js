
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const marchant = require("../../models/marchantModel")
const cotp = require("../../models/marchentOTP")

// register client
const registerMarchant = async (req, res, next) => {

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
     try {
      console.log("herererere")

      const mail = req.body.email;

      let OTPgenerator = () => {
        let numbers = "0123456789";
        let OTP = "";
        for (let i = 0; i < 4; i++) {
          OTP += numbers[Math.floor(Math.random() * 10)];
        }
        return OTP;
      };
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "gaurav.tripathi@appventurez.com",
          pass: "Siyaram1234$",
        },
      });
      let otp = OTPgenerator();

      let mailOptions = {
        from: "gaurav.tripathi@appventurez.com",
        to: mail,
        subject: "OTP verification",
        text: otp,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.json("Email Sent successfully");
          console.log("Email sent: ");
        }
      });

      console.log(mail)
      let data = {
        email: mail,
        OTP: otp
      }
      const check = await cotp.findOne({ where: { email: mail } })
      //   const otpprint=await cotp.create(data)
      if (check) {
        await cotp.update({ OTP: otp }, { where: { email: mail } })
      }
      else {
        await cotp.create(data)
      }
      const theToken = jwt.sign({ mail }, 'the-super-strong-secrect', { expiresIn: '1h' });
      res.status(200).json({
        token: theToken
      })
    } catch (err) {
      res.send("in catch Please go to verify emAIL api to confirm your registration")
      next(err);
    }
  }else{
    const theToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(theToken, "the-super-strong-secrect");
    res2email=decoded.email;
    resstatus=decoded.status;
    const check=await marchant.findOne({where:{email:res2email}});
    let pass = await bcrypt.hash(req.body.password, 10);

    if(!check){
    const data={
      name:req.body.name,
      email:req.body.email,
      password:pass,
    }
    let putData= await marchant.create(data);
    await marchant.update({status:resstatus},{where:{email:res2email}});
    res.json({
      message:"Data is successfully uploaded"
    })
  }
  else{
    res.json({
      message:"Given email is already registered"
    })
  }
}
}

module.exports = {
  registerMarchant
}