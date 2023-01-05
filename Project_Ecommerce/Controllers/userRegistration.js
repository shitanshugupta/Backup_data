const userModel=require('../models/model.js')
const User=userModel.User

userRegistration=async(req,res)=>{
    // const {name,email,password,password_confirmation,tc}=req.body
    // const [user]=await User.findOne({where:{email:email}})
    // console.log("hellodffhdhdahahdahah",user);
    // if(user){
    //     res.send({"status":"failed","messaage":"Email already Exists"})
    // }
    // else{
    //     if(name && email && password && password_confirmation && tc){
    //         if(password === password_confirmation){
    //            try {
    //             const salt =await bcrypt.genSalt(10)
    //             const hashPassword=await bcrypt.hash(password,salt) // according to salt it will create hash
    //             const doc=await User.create({
    //                 name:name,
    //                 email:email,
    //                 password:hashPassword,
    //                 tc:tc

    //             })
    //             await doc.save()
    //             //Generate Token
    //             const saved_user=await User.findOne({where:{email:email}})
    //             const token=jwt.sign({userID:saved_user._id},process.env.SECRET_KEY,{expiresIn:'5d'})

    //             res.status(201).send({"status":"success","message":"User Registered Succesfully...",'token':token})
    //             } 
    //             catch (error) {
    //                 res.send({"status":"failed","message":"Unable to Register"})

    //             }
    //         }
    //         else{
    //             res.send({"status":"failed","message":"password and confirmed password does not match"})
    //         }
    //     }
    //     else{
    //         res.send({"status":"failed","message":"All fields are required"})
    //     }
    // }
    let data=await User.create({
        
    
            name:"Shitanshu",
            email:"shitanshu@gmail.com",
            password:"1234",
            password_confirmation:"1234"
        
            
        
    })
    data.save()
    res.send({"status":"succss"})
}

module.exports={
    userRegistration
}