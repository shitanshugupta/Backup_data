const db = require("../../models/index")
const jwt = require('jsonwebtoken')


const MerchantShowUser = async (req, res) => {

    const { authorization } = req.headers
    if ((authorization) && (authorization.startsWith('Bearer'))) {
        try {
            const token = authorization.split(' ')[1]
            const SECRETKEY = "SECRETKEY"
            const { merchant_id } = jwt.verify(token, SECRETKEY)
            console.log("hello");

            const MerchantSale = await db.Orders.findAll({
                attributes: ['Product_name', 'Quantity_order','Total_amount', 'Delivery_address'],

                where: {
                    Merchant_id: merchant_id
                }
            }, {
                include: [
                    {model:db.Users, attributes: ['name', 'email']}
                ]
            })
            console.log(MerchantSale.User);
        } catch (error) {
            res.status(401).send({ "status": "failed", "message": error })
        }
    }
}
module.exports = MerchantShowUser