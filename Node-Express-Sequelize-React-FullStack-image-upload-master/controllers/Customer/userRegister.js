
const db = require('../../models/index.js')
const bcrypt=require('bcrypt')

const jwt= require('jsonwebtoken')
const emailVerify=require('../../services/emailVerify')
// create main Model
const User=db.Users // 
// main work

const userRegistration=async(req,res)=>{
    const {name,email,password,password_confirmation,user_type}=req.body
    emailVerify(email,res)
    
    }
module.exports=userRegistration
