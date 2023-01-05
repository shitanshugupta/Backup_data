const express=require("express")
const router=express.Router();
const {userRegistration} =require('../Controllers/userRegistration')

router.post('/Registration',userRegistration)

module.exports=router