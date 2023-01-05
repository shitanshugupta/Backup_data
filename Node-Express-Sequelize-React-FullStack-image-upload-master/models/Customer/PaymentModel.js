module.exports = (sequelize, DataTypes) => {

    const Payment = sequelize.define("Payment", {
        Payment_intent_id: {
            type: DataTypes.STRING
        },
        Payment_Status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Transaction_id: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Payment
}