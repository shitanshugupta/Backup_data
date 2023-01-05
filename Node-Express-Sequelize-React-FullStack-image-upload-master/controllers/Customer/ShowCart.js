const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const jwt = require('jsonwebtoken')
const db = require('../../models')
const ShowCart = async (req, res) => {
    try {
        const { authorization } = req.headers
        const { page, limit } = req.query
        if ((authorization) && (authorization.startsWith('Bearer'))) {
            const token = authorization.split(' ')[1]
            const SECRETKEY = "SECRETKEY"
            const { user_email } = jwt.verify(token, SECRETKEY);
            const { name, id } = await db.Users.findOne({
                where: {
                    email: user_email
                }
            })
            const showcart = await db.Carts.findAll({
                attributes: ['HSN_CODE', 'Product_name', 'Quantity_order', 'price',
                    'discount', 'Total_Amount'],
                offset: (page - 1) * limit,
                limit: +limit,
            })
            res.status(StatusCodes.OK)
                .send({
                    status: StatusCodes.OK,
                    response: getReasonPhrase(StatusCodes.OK),
                    "message": `${name} added these items in cart`,
                    "showcart": showcart
                })
        } else {
            res.status(StatusCodes.UNAUTHORIZED)
                .send({
                    status: StatusCodes.UNAUTHORIZED,
                    error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                    response: {},
                })
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                response: {},
            })
    }
}

module.exports = ShowCart