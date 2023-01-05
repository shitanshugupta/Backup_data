module.exports=(sequelize,DataTypes)=>{
    const Cart=sequelize.define('Cart',{
        HSN_CODE:{
            type:DataTypes.INTEGER,
            allownull:false
            
        },
        Product_name:{
            type:DataTypes.STRING,
            allownull:false
        },
        Quantity_order:{
            type:DataTypes.INTEGER,
            allownull:false
        },
        price:{
            type:DataTypes.FLOAT,
            allownull:false
        },
        discount:{
            type:DataTypes.INTEGER,
            allownull:false
        },
        Total_Amount:{
            type:DataTypes.FLOAT,
            allownull:false
        }
    })
    return Cart
}