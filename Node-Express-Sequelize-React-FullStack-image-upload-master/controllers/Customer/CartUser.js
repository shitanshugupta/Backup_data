const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const db = require("../../models/index")
const jwt = require('jsonwebtoken')
const { Sequelize, sequelize } = require("../../models/index")


const CartUser = async (req, res) => {
    try {
        const { Product_id, Quantity_order } = req.body
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
            const Product = await db.Products.findOne({
                where: {
                    id: Product_id
                }
            })
            const CartRow = await db.Carts.findOne({
                where: {
                    Product_id: Product_id
                }
            })

            if (CartRow) {
                if ((Product.Stocks - Quantity_order) >= 0) {
                    // temp = CartRow.Quantity_order
                    TotalAmount = (Quantity_order * Product.price)
                    discounted_Amount = (TotalAmount - (TotalAmount * (Product.discount / 100)))
                    await db.Carts.update({
                        Quantity_order: (Quantity_order),
                        Total_Amount: discounted_Amount,
                        price: Product.price
                    }, {
                        where: {

                            Product_id: Product_id
                        }
                    })
                    res.status(StatusCodes.OK)
                        .send({
                            status: StatusCodes.OK,
                            response: getReasonPhrase(StatusCodes.OK),
                            "message": "Product Updated to Cart Succesfully",

                        })
                } else {
                    res.status(StatusCodes.NOT_ACCEPTABLE)
                        .send({
                            status: StatusCodes.NOT_ACCEPTABLE,
                            response: getReasonPhrase(StatusCodes.NOT_ACCEPTABLE),
                            "message": "Not Enough Item To Add In A Cart",
                        })
                }
            }
            else {
                if ((Product.Stocks - Quantity_order) >= 0) {
                    TotalAmount = (Quantity_order * Product.price)
                    discounted_Amount = (TotalAmount - (TotalAmount * (Product.discount / 100)))
                    const doc = await db.Carts.create({
                        User_id: id,
                        HSN_CODE: Product.HSN_CODE,
                        Product_name: Product.Product_name,
                        Quantity_order: Quantity_order,
                        price: Product.price,
                        discount: Product.discount,
                        Total_Amount: discounted_Amount,
                        Product_id: Product.id,
                        Merchant_id: Product.Merchant_id

                    })
                    res.status(StatusCodes.OK)
                        .send({
                            status: StatusCodes.OK,
                            response: getReasonPhrase(StatusCodes.OK),
                            "message": "Product Added to Cart Succesfully",
                        })
                }
                else {
                    res.status(StatusCodes.NOT_ACCEPTABLE)
                        .send({
                            status: StatusCodes.NOT_ACCEPTABLE,
                            response: getReasonPhrase(StatusCodes.NOT_ACCEPTABLE),
                            "message": "Not Enough Item To Add In A Cart",

                        })
                }
                const Amount = await db.Carts.findAll({
                    attributes:
                        [[sequelize.fn("SUM", sequelize.col("Total_Amount")), "Amount"]],

                    group: "User_id"
                });

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

module.exports = CartUser

