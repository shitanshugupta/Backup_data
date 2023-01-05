// jitni bhi schema banege models me wo sb index .js me jayege aur as a table db me add ho jayege

const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
    timezone: '+05:30',


    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle

    }
}
)

sequelize.authenticate()
    .then(() => {
        console.log('connected..')
    })
    .catch(err => {
        console.log('Error', err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Users = require('./Customer/userModel.js')(sequelize, DataTypes)
db.Otp = require('./Customer/otps.js')(sequelize, DataTypes)
db.Merchants = require('./Merchant/MerchantModel.js')(sequelize, DataTypes)
db.Categories = require('./Merchant/Category.js')(sequelize, DataTypes)
db.SubCategories = require('./Merchant/SubCategory.js')(sequelize, DataTypes)
db.Products = require('./Merchant/ProductModel')(sequelize, DataTypes)
db.Addresss = require('./Customer/addressModel.js')(sequelize, DataTypes)
db.Carts = require('./Customer/CartModel')(sequelize, DataTypes)
db.Orders = require('./Customer/orderModel')(sequelize, DataTypes)
db.OrderHistorys = require('./Customer/OrderHistoryModel')(sequelize, DataTypes)
db.Payments = require('./Customer/PaymentModel')(sequelize, DataTypes)




// 1 to Many Relation(Category to Subcategory realtion)

db.Categories.hasMany(db.SubCategories, {
    foreignKey: 'category_id'
})
db.SubCategories.belongsTo(db.Categories, {
    foreignKey: 'category_id'
})

// // 1 to Many Relation(Category to Product relation)
db.Categories.hasMany(db.Products, {
    foreignKey: 'category_id'
})
db.Products.belongsTo(db.Categories, {
    foreignKey: 'category_id'
})

// // 1 to Many Relation(SubActegory to Product relation)
db.SubCategories.hasMany(db.Products, {
    foreignKey: 'SubCategory_id'
})
db.Products.belongsTo(db.SubCategories, {
    foreignKey: 'SubCategory_id'
})

// // 1 to Many Relation(Merchant to Product relation)
db.Merchants.hasMany(db.Products, {
    foreignKey: 'Merchant_id'
})
db.Products.belongsTo(db.Merchants, {
    foreignKey: 'Merchant_id'
})


// // 1 to Many Relation(Users to Address relation)
db.Users.hasMany(db.Addresss, {
    foreignKey: 'User_id'
})
db.Addresss.belongsTo(db.Users, {
    foreignKey: 'User_id'
})


db.Users.hasMany(db.Orders, {
    foreignKey: 'User_id'
})
db.Orders.belongsTo(db.Users, {
    foreignKey: 'User_id'
})



// // One User has One Cart

db.Users.hasOne(db.Carts, {
    foreignKey: 'User_id'
})
db.Carts.belongsTo(db.Users, {
    foreignKey: 'User_id'
})



db.Products.hasMany(db.Carts, {
    foreignKey: 'Product_id'
})
db.Carts.belongsTo(db.Products, {
    foreignKey: 'Product_id'
})

db.Merchants.hasMany(db.Carts, {
    foreignKey: 'Merchant_id'
})

db.Carts.belongsTo(db.Merchants, {
    foreignKey: 'Merchant_id'
})

db.Users.hasOne(db.Orders, {
    foreignKey: 'User_id'
})
db.Orders.belongsTo(db.Users, {
    foreignKey: 'User_id'
})

db.Orders.hasMany(db.OrderHistorys, {
    foreignKey: 'Order_id'
})
db.OrderHistorys.belongsTo(db.Orders, {
    foreignKey: 'Order_id'
})

db.Users.hasMany(db.OrderHistorys, {
    foreignKey: 'User_id'
})
db.OrderHistorys.belongsTo(db.Users, {
    foreignKey: 'User_id'
})

db.Merchants.hasMany(db.OrderHistorys, {
    foreignKey: 'Merchant_id'
})
db.OrderHistorys.belongsTo(db.Merchants, {
    foreignKey: 'Merchant_id'
})

db.Products.hasMany(db.OrderHistorys, {
    foreignKey: 'Product_id'
})
db.OrderHistorys.belongsTo(db.Products, {
    foreignKey: 'Product_id'
})

db.Users.hasMany(db.Payments, {
    foreignKey: 'User_id'
})
db.Payments.belongsTo(db.Users, {
    foreignKey: 'User_id'
})

db.Payments.hasOne(db.Orders,{
    foreignKey:'Payment_id'
})
db.Orders.belongsTo(db.Payments,{
    foreignKey:'Payment_id'
})
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })


module.exports = db
