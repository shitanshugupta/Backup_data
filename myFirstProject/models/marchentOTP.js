const  Sequelize = require("sequelize");
const sequelize=require('../database/database')

const Marchantotp = sequelize.define("marchantOTP",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING
    },
    OTP: {
        type: Sequelize.INTEGER
    },

}, {
    timestamps: false 
}
);



module.exports=Marchantotp;