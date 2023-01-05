//Controller path
const FinalRegister = require('../../controllers/Customer/FinalUserRegister.js')
const userAddress = require('../../controllers/Customer/userAddress.js')
const userLogin = require('../../controllers/Customer/userlogin.js')
const userRegistration = require('../../controllers/Customer/userRegister.js')
const userVerify = require('../../controllers/Customer/userVerify.js')
const getAllProducts = require('../../controllers/Customer/getAllProductMerchant')
const orderProducts = require('../../controllers/Customer/orderProducts')
const SearchProduct = require('../../controllers/Customer/SearchProduct')
const CartUser = require('../../controllers/Customer/CartUser')
const OrderHistory = require('../../controllers/Customer/OrderHistory')
const ShowCart = require('../../controllers/Customer/ShowCart')
const DeleteCartProduct = require('../../controllers/Customer/DeleteCartProduct')
const success=require('../../controllers/Customer/success')
// Validation path
const validationResult = require('../../Validation/validation')


// middleware
const checkUserAuth = require('../../Middleware/UserMiddleware')
const DeleteCartProductQuantity = require('../../controllers/Customer/DeleteCartProduct')
// const payment = require('../../Middleware/PaymentInitiate.js')
const createorder=require('../../Middleware/razorpay/createorder')
const paymentverify=require('../../Middleware/razorpay/paymentverify')

// router
const router = require('express').Router()


// use routers  

router.get('/SearchProduct', SearchProduct)
router.get('/ShowCart', checkUserAuth, ShowCart)
router.get('/success',success)

//razorpay routes
router.post('/paymentverify',paymentverify)
router.post('/createorder',createorder)

router.post('/Registration', validationResult.customerRegistration, userRegistration)
router.post('/UserVerify', validationResult.customerVerify, userVerify)
router.post('/FinalRegister', validationResult.customerRegistration, FinalRegister)
router.post('/UserLogin', validationResult.customerLogin, checkUserAuth, userLogin)
router.post('/UserAddress', validationResult.customerAddress, checkUserAuth, userAddress)
router.post('/GetAllProduct', checkUserAuth, getAllProducts)
router.post('/CartProduct', validationResult.customerCart, checkUserAuth, CartUser)
router.post('/OrderProduct', validationResult.orderProduct, checkUserAuth, orderProducts)
router.post('/OrderHistory', checkUserAuth, OrderHistory)
router.delete('/DeleteCartProduct', validationResult.deleteProduct, DeleteCartProduct)


module.exports = router