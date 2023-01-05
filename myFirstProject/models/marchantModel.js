
const DataTypes=require("sequelize");
const Sequelize=require("../database/database");

const marchant=Sequelize.define("marchantTable",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    companyName:{
        type:DataTypes.STRING,
    },
    productType:{
        type:DataTypes.STRING,
    },
    gstNumber:{
        type:DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    adminVerified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
})
module.exports=marchant;
