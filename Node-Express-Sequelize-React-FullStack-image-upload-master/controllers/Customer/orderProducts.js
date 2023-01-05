const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const db = require("../../models/index")
const jwt = require('jsonwebtoken')
var crypto = require("crypto");

const { Sequelize, sequelize } = require("../../models/index")
const orderProducts = async (req, res) => {
    try {
        const { Address_id, Payment_id, Payment_order_id, Payment_signature } = req.body
        const { authorization } = req.headers
        if ((authorization) && authorization.startsWith('Bearer')) {
            const token = authorization.split(' ')[1]
            const SECRETKEY = "SECRETKEY"
            const { user_email } = jwt.verify(token, SECRETKEY);
            console.log(user_email);
            const User_Row = await db.Users.findOne({
                where: {
                    email: user_email
                }
            })
            console.log(User_Row.id);

            let body = Payment_order_id + "|" + Payment_id;
            console.log(body);
            var expectedSignature = crypto.createHmac('sha256', 'BWGFoS67VyergVtqMtDZzeBO')
                .update(body.toString())
                .digest('hex');
            console.log((expectedSignature));
            var response = { "signatureIsValid": "false" }
            if (expectedSignature === Payment_signature) {
                response = { "signatureIsValid": "true" }
                console.log(response);
                const payment=await db.Payments.create({
                    Payment_intent_id:Payment_order_id,
                    Transaction_id:Payment_id,
                    Payment_Status:"PAID",
                    User_id:User_Row.id
                })

                const CartRows = await db.Carts.findAll({
                    attributes: ['HSN_CODE', 'Product_name', 'Quantity_order', 'price',
                        'Total_Amount', 'User_id', 'Merchant_id', 'Product_id'],
                    where: {
                        User_id: User_Row.id
                    }
                })

                let ar1 = []
                for (let i = 0; i < CartRows.length; i++) {
                    ar1[i] = CartRows[i].Product_id
                }
                const cartProduct = await db.Products.findAll({
                    where: {
                        id: ar1
                    }
                });

                let ob = {}
                for (let i = 0; i < CartRows.length; i++) {

                    if (cartProduct[i].Stocks - CartRows[i].Quantity_order >= 0) {
                        ob[`stock[${i}]`] = "In Stock"
                    }
                    else {
                        ob[`stock[${i}]`] = "Out Of Stock"
                    }
                }
                console.log(ob);
                let flag = 0
                for (let i in ob) {
                    if (ob[i] == 'Out Of Stock') {
                        flag += 1
                    }
                }
                if (flag == Object.keys(ob).length) {
                    res.send("Product Out of stock Money will be Refunded")
                }
                else {
                    const Total_Product = await db.Carts.findAll({
                        attributes:
                            [[sequelize.fn("SUM", sequelize.col("Quantity_order")), "Total_Product"]],
                        group: "User_id"
                    });
                    console.log(Total_Product[0].dataValues.Total_Product);

                    const Amount = await db.Carts.findAll({
                        attributes:
                            [[sequelize.fn("SUM", sequelize.col("Total_Amount")), "Amount"]],

                        group: "User_id"
                    })
                    console.log(Amount);
                    Sub_Amount = (Amount[0].dataValues.Amount)
                    console.log(Sub_Amount);
                    const shipping_charge = (Sub_Amount >= 1000) ? 0 : 100
                    const tax = 5

                    Total_Amount = ((Sub_Amount) + ((tax / 100) * (Sub_Amount)))
                    Grand_Total = Total_Amount + shipping_charge

                    const AddressRow = await db.Addresss.findOne({
                        where: {
                            id: Address_id
                        }
                    })
                    await db.Orders.create({
                        Total_Product: Total_Product[0].dataValues.Total_Product,
                        Total_Amount_IclTax: Total_Amount,
                        Tax: tax,
                        shipping_charge: shipping_charge,
                        Grand_Total: Grand_Total,
                        AddressLine_1: AddressRow.AddressLine_1,
                        City: AddressRow.City,
                        State: AddressRow.State,
                        Pin_Code: AddressRow.Pin_Code,
                        Mobile_No: AddressRow.Mobile_No,
                        User_id: User_Row.id,
                        Payment_id:payment.id
                    })
                    const showcart = await db.Carts.findAll({
                        attributes: ['HSN_CODE', 'Product_name', 'Quantity_order', 'price',
                            'discount', 'Total_Amount'],
                        where: {
                            User_id: User_Row.id
                        }
                    })
                    const { id } = await db.Orders.findOne({
                        where: {
                            User_id: User_Row.id
                        }
                    })
                    // adding Order id.

                    let ar = []
                    for (let i = 0; i < CartRows.length; i++) {
                        CartRows[i].dataValues.Order_id = id
                        ar[i] = CartRows[i].dataValues
                    }
                    // console.log("shitanshu");
                    await db.OrderHistorys.bulkCreate(ar)
                    let pd = []
                    for (let i = 0; i < CartRows.length; i++) {
                        cartProduct[i].dataValues.Stocks -= CartRows[i].Quantity_order
                        pd[i] = cartProduct[i].dataValues
                    }
                    await db.Products.bulkCreate(pd, {
                        updateOnDuplicate: ['Stocks']
                    })

                    // await db.Carts.destroy({
                    //     where:{
                    //         User_id:User_Row.id
                    //     }
                    // })
                    console.log("line 160");
                    res.status(StatusCodes.OK)
                        .send({
                            status: StatusCodes.OK,
                            response: getReasonPhrase(StatusCodes.OK),
                            "message": "Your Orders Are",
                            "showcart": showcart
                        })
                }
            } else {
                console.log("else one");
            }
        } else {
            res.status(StatusCodes.UNAUTHORIZED)
                .send({
                    status: StatusCodes.UNAUTHORIZED,
                    error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                    response: {},
                })
        }
    }
    catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                response: {error:error.message},
                
            })
    }
}

module.exports = orderProducts

