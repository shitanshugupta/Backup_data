const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const jwt = require("jsonwebtoken");
const db = require("../../models/index");

const MerchantAddCategory = async (req, res) => {
    try {
        const { category_name } = req.body
        const { authorization } = req.headers
        if ((authorization) && authorization.startsWith('Bearer')) {
            let token;
            token = authorization.split(' ')[1]
            SECRETKEY = "SECRETKEY"
            const { merchant_id } = jwt.verify(token, SECRETKEY)
            const merchantRow = await db.Merchants.findOne({
                where: {
                    id: merchant_id
                }
            })
            console.log("line 18");
            if (merchantRow) {
                const [user, created] = await db.Categories.findOrCreate({
                    where: {
                        category_name: category_name
                    }
                });
                res.status(StatusCodes.OK)
                    .send({
                        status: StatusCodes.OK,
                        response: getReasonPhrase(StatusCodes.OK),
                        "message": "Category Added",
                    })
            } else {
                res.status(StatusCodes.UNAUTHORIZED)
                    .send({
                        status: StatusCodes.UNAUTHORIZED,
                        error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                        response: {},
                    })
            }
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
module.exports = MerchantAddCategory