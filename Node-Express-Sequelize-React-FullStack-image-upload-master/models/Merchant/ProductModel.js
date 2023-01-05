module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        Name: {
            type: DataTypes.STRING,
            allownull: false
        },
        HSN_CODE: {
            type: DataTypes.INTEGER,
            allownull: false,
            unique: true
        },
        Description: {
            type: DataTypes.TEXT,
            allownull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allownull: false
        },
        Stocks: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        discount: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        Discount_Value: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status:{
            type:DataTypes.STRING,
            defaultValue:"Verified"
        }

    })
    return Product
}