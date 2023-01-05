const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const db = require("../../models")
const UpdateProduct = async (req, res) => {
    const { product_id, description, quantity, price, discount } = req.body
    try {
        const Product_Row = await db.Products.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                id: product_id
            }, raw: true
        });
        Product_Row.quantity += quantity ?? 0
        Product_Row.price = price ?? Product_Row.price
        Product_Row.Stocks += quantity ?? 0
        Product_Row.description = description ?? Product_Row.description
        Product_Row.discount = discount ?? Product_Row.discount
        await db.Products.update({
            Description: Product_Row.description,
            quantity: Product_Row.quantity,
            price: Product_Row.price,
            discount: Product_Row.discount,
            Stocks: Product_Row.Stocks
        }, {
            where: {
                id: product_id
            }
        })
        const CartRow = await db.Carts.findAll({
            where: {
                Product_id: product_id
            }
        })
        cid = []
        b = []
        for (let i = 0; i < CartRow.length; i++) {
            cid[i] = CartRow[i].id
            CartRow[i].price = price ?? CartRow[i].price
            CartRow[i].discount = discount ?? CartRow[i].discount
            CartRow[i].Total_Amount = (CartRow[i].price * CartRow[i].Quantity_order - (CartRow[i].price * CartRow[i].Quantity_order * CartRow[i].discount / 100));
            b[i] = CartRow[i].dataValues
        }
        await db.Carts.bulkCreate(b, {
            updateOnDuplicate: ['price', 'discount', 'Total_Amount'],
        })
        res.status(StatusCodes.OK)
            .send({
                status: StatusCodes.OK,
                response: getReasonPhrase(StatusCodes.OK),
                "message": "Product Updated Succesfully",
            })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                response: {},
            })
    }
}
module.exports = UpdateProduct