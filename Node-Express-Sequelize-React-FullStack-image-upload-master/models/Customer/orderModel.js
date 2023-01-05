module.exports=(sequelize,DataTypes)=>{
    const Order=sequelize.define('Order',{
        
        Total_Product:{
            type:DataTypes.INTEGER,
            allownull:false
        },
        Total_Amount_IclTax:{
            type:DataTypes.FLOAT,
            allownull:false
        },
        Tax:{
           type:DataTypes.FLOAT,
           allownull:false
        },
        shipping_charge:{
            type:DataTypes.INTEGER,
            allownull:false,
            defaultValue:0
        },
        Grand_Total:{
            type:DataTypes.INTEGER,
            allownull:false
        },
        
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
        },
        // Payment_id:{
        //     type:DataTypes.STRING,
        //     allownull:false
        // },
        // Payment_Status:{
        //     type:DataTypes.STRING,
        //     allownull:false
        // }
        
    })
    return Order
}