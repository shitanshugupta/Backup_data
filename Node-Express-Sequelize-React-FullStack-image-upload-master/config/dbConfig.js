module.exports = {
    HOST: 'localhost',
    USER: 'harry',
    PASSWORD: '11111',
    DB: 'ECommerce',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}