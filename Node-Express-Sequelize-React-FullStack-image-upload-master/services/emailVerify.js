const nodemailer = require("nodemailer");
const db = require('../models/index')
const OTPgenerator = require('./otpGenerator')
const jwt = require('jsonwebtoken')
emailVerify = async (email, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shitanshu@appventurez.com",
      pass: "gihzbwwunuqssbrk",
    },
  });
  let otp = OTPgenerator();

  let mailOptions = {
    from: "shitanshu@appventurez.com",
    to: email,
    subject: "OTP verification",
    text: otp,
  };
  transporter.sendMail(mailOptions, async function (error, info) {

    if (error) {
      res.status(StatusCodes.BAD_GATEWAY)
        .send({
          status: StatusCodes.BAD_GATEWAY,
          error:getReasonPhrase(StatusCodes.BAD_GATEWAY),
          response:{},
        })
    } else {
      SECRETKEY = "SECRETKEY"
      const token = jwt.sign({ user_email: email }, SECRETKEY)
      res.status(StatusCodes.OK)
        .send({
          status: StatusCodes.OK,
          response: getReasonPhrase(StatusCodes.OK),
          "message": "Email sent succesfully...",
          'token': token
        })

      const doc = await db.Otp.create({
        otp: otp,
        email: email

      })
      console.log(doc);
    }
  });

  console.log(email)
}
module.exports = emailVerify