const Razorpay = require('razorpay');

const createorder = async (req, res) => {

    var instance = new Razorpay({
        key_id: 'rzp_test_sCF5lbrMIVsHXW',
        key_secret: 'BWGFoS67VyergVtqMtDZzeBO',
    });

    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function (err, order) {
        console.log(order);
        res.send({ orderId: order.id })
    });

}
module.exports = createorder