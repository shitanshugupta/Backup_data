const {Sequelize}=require('sequelize')

const sequelize= new Sequelize("sequelizedb","harry","11111",{
    host:"localhost",
    dialect:"mysql",
    logging:false
})


module.exports=sequelize;