const  Sequelize  = require('sequelize');
const sequelize = new Sequelize('ECommerce', 'harry', '11111', {
    host: 'localhost',
    dialect:'mysql',
    logging:false
})


try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


const db={}
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.User=require('../models/model.js')(sequelize,Sequelize.DataTypes)
db.sequelize.sync({
    force:true
})
.then(()=>{
    console.log("resync");
})

module.exports=db



  