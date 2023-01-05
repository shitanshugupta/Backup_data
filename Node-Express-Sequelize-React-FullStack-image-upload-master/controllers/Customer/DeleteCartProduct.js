const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const db = require("../../models/index")
const jwt = require('jsonwebtoken')
const { Sequelize, sequelize } = require("../../models/index")

const DeleteCartProduct = async (req, res) => {
    try {
        const { Product_id } = req.body
        const { authorization } = req.headers
        if ((authorization) && (authorization.startsWith('Bearer'))) {

            const token = authorization.split(' ')[1]
            const SECRETKEY = "SECRETKEY"
            const { user_email } = jwt.verify(token, SECRETKEY);
            const { id } = await db.Users.findOne({
                where: {
                    email: user_email
                }
            })
            const delCart = await db.Carts.destroy({
                where: {
                    [Sequelize.Op.and]:
                        [
                            { Product_id: Product_id },
                            { User_id: id }
                        ]
                }
            })
            res.status(StatusCodes.OK)
                .send({
                    status: StatusCodes.OK,
                    response: getReasonPhrase(StatusCodes.OK),
                    "message": `Cart Product Deleted Succesfully`,
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
module.exports = DeleteCartProduct