module.exports=(sequelize,DataTypes)=>{
    const OrderHistory=sequelize.define('OrderHistory',{
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
        Total_Amount:{
            type:DataTypes.FLOAT,
            allownull:false
        }
    })
    return OrderHistory
}