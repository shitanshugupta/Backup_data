module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        AddressLine_1:{
            type:DataTypes.TEXT,
            allownull:false
        },
        City:{
            type:DataTypes.STRING,
            allownull:false
        },
        State:{
            type:DataTypes.STRING,
            allownull:false
        },
        Pin_Code:{
            type:DataTypes.STRING,
            allownull:false
        },
        Mobile_No:{
            type:DataTypes.STRING,
            allownull:false
        }
    })
    return Address
}