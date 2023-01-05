const sequelize=require('./database/database');
const Client=require('./models/clientmodel')
const OTP=require("./models/otp")
const marchantOTP=require("./models/marchentOTP")
const marchant=require("./models/marchantModel")


try{
    sequelize.sync();
 console.log("Connection has been established succesffully");

}
catch(error){
    console.error("Unable to connect to the database",error)
}

marchantOTP.sync({force:false})
Client.sync({force:false})
OTP.sync({force:false})
marchant.sync({force:false})