module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        },
        user_type:{
            type:DataTypes.STRING,
            defaultValue:"User"
       }
    
    },{
        
        timestamps:false
    })

    return User

}