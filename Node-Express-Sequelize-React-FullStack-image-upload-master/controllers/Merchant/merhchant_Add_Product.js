const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const jwt = require("jsonwebtoken")
const { sequelize, SubCategories } = require("../../models/index")
const db = require('../../models/index')
const Merchant_Add_product = async (req, res) => {
    console.log("hello");
    try {
        const { name, HSN_CODE, description, quantity, price, discount, category_id, sub_category_id } = req.body
        const { authorization } = req.headers
        if ((authorization) && authorization.startsWith('Bearer')) {
            const token = authorization.split(' ')[1]
            const SECRETKEY = "SECRETKEY"
            const { merchant_id } = jwt.verify(token, SECRETKEY);
            console.log(merchant_id);
            const merchantRow = await db.Merchants.findOne({
                where: {
                    id: merchant_id
                }
            })
            const check = await db.Products.findOne({
                where: {
                    [db.Sequelize.Op.and]: [
                        { HSN_CODE: HSN_CODE },
                        { Merchant_id: merchant_id }
                    ]
                }
            })
            if (check !== null) {
                res.status(StatusCodes.OK)
                    .send({
                        status: StatusCodes.OK,
                        response: getReasonPhrase(StatusCodes.OK),
                        "message": "Product Already Exists",
                    })
            }
            else {
                const cat = await db.Categories.findOne({
                    where: {
                        id: category_id
                    }
                })
                if (cat == null) {
                    res.status(StatusCodes.BAD_REQUEST)
                        .send({
                            status: StatusCodes.BAD_REQUEST,
                            error: getReasonPhrase(StatusCodes.BAD_REQUEST),
                            response: { "message": "Category Not Exist. Create a new First" },
                        })
                } else {
                    const subcat = await db.SubCategories.findOne({
                        where: {
                            id: sub_category_id
                        }
                    })

                    if (subcat == null) {
                        res.status(StatusCodes.BAD_REQUEST)
                            .send({
                                status: StatusCodes.BAD_REQUEST,
                                error: getReasonPhrase(StatusCodes.BAD_REQUEST),
                                response: { "message": "Sub Category Not Exist. Create a new" },
                            })
                    } else {
                        Discount_Value = (price - (price * (discount / 100)))
                        await db.Products.create({
                            Name: name,
                            HSN_CODE: HSN_CODE,
                            Description: description,
                            quantity: quantity,
                            Stocks: quantity,
                            price: price,
                            Merchant_id: merchantRow.id,
                            category_id: category_id,
                            SubCategory_id: sub_category_id,
                            discount: discount,
                            Discount_Value: Discount_Value
                        })
                    }
                }
            }
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
module.exports = Merchant_Add_product