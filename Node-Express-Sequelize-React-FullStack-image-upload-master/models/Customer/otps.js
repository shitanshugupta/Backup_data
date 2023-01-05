module.exports = (sequelize, DataTypes) => {

    const Otp = sequelize.define("Otp", {
        otp: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    
    },{
        timestamps:false
    })

    return Otp

}