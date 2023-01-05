const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator')



let OTPgenerator = () => {
  let numbers = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += numbers[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
module.exports=OTPgenerator