const  Sequelize = require('sequelize');
const sequelize=require('../database/database')

const otp = sequelize.define("OTP",{
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



module.exports=otp;