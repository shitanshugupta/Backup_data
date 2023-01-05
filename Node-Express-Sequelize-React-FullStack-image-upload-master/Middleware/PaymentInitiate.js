// const db = require('../models');
// const jwt = require('jsonwebtoken')
// const stripe = require('stripe')('sk_test_51LfIUISGFKiAh8S9Duh4DLKwlm1eQM5g4WOMiRrrUtPOY9HSG4mJOqlIsX8cUq1ETfioq1gL0uvT5J8zwQ0S0aPI00EwQJ4JLg')
// const payment = async (req, res, next) => {
//     console.log('line 4');
//     try {
//         const { Address_id, CardNumber, ExpiryMonth, ExpiryYear, CVC } = req.body
//         const { authorization } = req.headers
//         if ((authorization) && (authorization.startsWith('Bearer'))) {
//             const token = authorization.split(' ')[1]
//             const SECRETKEY = "SECRETKEY"
//             const { user_email } = jwt.verify(token, SECRETKEY);
//             const userDeatails = await db.Addresss.findOne({
//                 attributes: ['City', 'State', 'AddressLine_1', 'Pin_Code', 'Mobile_No'],
//                 where: {
//                     id: Address_id
//                 }, raw: true,
//                 include: [
//                     {
//                         model: db.Users, attributes: ['name', 'email'],
//                         where: {
//                             email: user_email
//                         }
//                     }]
//             })
//             const customer = await stripe.customers.create({
//                 name: userDeatails['User.name'],
//                 email: userDeatails['User.email'],
//                 phone: userDeatails.Mobile_No
//             });
//             console.log(userDeatails);
//             let paymentMethod = await stripe.paymentMethods.create({
//                 type: 'card',
//                 card: {
//                     number: CardNumber,
//                     exp_month: ExpiryMonth,
//                     exp_year: ExpiryYear,
//                     cvc: CVC,
//                 },
//                 billing_details: {
//                     address: {
//                         city: userDeatails.City,
//                         country: "IN",
//                         line1: userDeatails.AddressLine_1,
//                         line2: "IN",
//                         postal_code: userDeatails.Pin_Code,
//                         state: userDeatails.State
//                     },
//                     email: userDeatails['User.email'],
//                     name: userDeatails['User.name'],
//                     phone: userDeatails.Mobile_No
//                 }
//             })
//             // console.log(paymentMethod);
//             const paymentIntent = await stripe.paymentIntents.create({
//                 payment_method: paymentMethod.id,
//                 amount: 75 * 100,
//                 currency: 'inr',
//                 confirm: true,
//                 customer: customer.id,
//                 payment_method_types: ['card'],
//                 off_session: true   
//             })
//             req.customer_id = customer.id
//             req.Payment_Status = paymentIntent.charges.data[0].paid;
//             req.Payment_id = paymentIntent.id;
//             next();
//             // stripe.balance.retrieve(function (err, balance) {
//             //     // asynchronously called
//             //     // res.send(balance)
//             // });

//             // await db.Payments.create({
//             //     Payment_intent_id:paymentIntent.charges.data[0]
//             // })
//             // console.log(paymentIntent.charges.data[0].paid)
//             res.send(paymentIntent);

//         }
//     } catch (error) {
//         next(error)
//     }
// }
// module.exports = payment
// const paypal = require('paypal-rest-sdk');
// const payment = async (req, res, next) => {
//     try {
//         paypal.configure({
//             'mode': 'sandbox', //sandbox or live
//             'client_id': 'AUFCv50R2Lmt9Kg1E7JoMZvyWjDV2Qraj7vn3d4jpIQnyQOK-chTdf1JyZRm-b51m5GlSK2nthUM9-lB',
//             'client_secret': 'EK6tgepwK4-Y6zErm0clBI0m4O8NRh-ZJa_OD18MW1WR2ta1fwzRDXPmh0aCdMQrP9iCxJYBm2QdDh-E'
//         });

//         const create_payment_json = {
//             "intent": "sale",
//             "payer": {
//                 "payment_method": "paypal"  
//             },
//             "redirect_urls": {
//                 "retu    rn_url": "http://localhost:8080/api/customer/success",
//                 "cancel_url": "http://localhost:8080/cancel"
//             },
//             "transactions": [{
//                 "item_list": {
//                     "items": [{
//                         "name": "item",
//                         "sku": "item",
//                         "price": "30.00",
//                         "currency": "USD",
//                         "quantity": 1
//                     }]
//                 },
//                 "amount": {
//                     "currency": "USD",
//                     "total": "30.00"
//                 },
//                 "description": "Payment By Paypal Platform."
//             }]
//         };


//         paypal.payment.create(create_payment_json, function (error, payment) {
//             if (error) {
//                 throw error;
//             } else {
//                 for(let i = 0;i < payment.links.length;i++){
//                   if(payment.links[i].rel === 'approval_url'){
//                     res.send(payment.links[i].href);
//                   }
//                 }
//             }
//         });
//     } catch (error) {
//         res.send(error)
//     }
// }
// module.exports = payment
// const Razorpay = require('razorpay');

// const payment = async (req, res) => {
//     var instance = new Razorpay({
//         key_id: 'rzp_test_sCF5lbrMIVsHXW',
//         key_secret: 'BWGFoS67VyergVtqMtDZzeBO',
//     });

//     var options = {
//         amount: 50000,  // amount in the smallest currency unit
//         currency: "INR",
//         receipt: "order_rcptid_11"
//     };
//     instance.orders.create(options, function (err, order) {
//         console.log(order);
//         res.send({ orderId: order.id })
//     });

// }
// module.exports = payment