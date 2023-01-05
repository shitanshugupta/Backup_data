const  DataTypes = require('sequelize');
const sequelize=require('../database/database')

const client = sequelize.define("ClientTable",{
    
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        },
        address:{
            type:DataTypes.STRING
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
}
);



module.exports=client;