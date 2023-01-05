const {sequelize, DataTypes}=require('sequelize')
module.exports=(sequelize,DataTypes)=>{
    const User = sequelize.define('User', {
        // Model attributes are defined here
        name: {
        type: DataTypes.STRING,
        allowNull: false
        },
        email: {
        type: DataTypes.STRING
        // allowNull defaults to true
        },
        password:{
        type: DataTypes.STRING,
        allowNull: false
        },
        password_confirmation:{
        type: DataTypes.STRING,
        allowNull: false
        },
    }, {
        timestamps:false
        // Other model options go here
    });
    return User;
   
}
