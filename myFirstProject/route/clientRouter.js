const clientRegisterController = require('../controllers/clientControllers/clientRegisterController');
const clientloginController = require('../controllers/clientControllers/clientloginController');
const clientVerifyOTP=require("../controllers/clientControllers/clientverifyOTP");
const clientaddaddress = require('../controllers/clientControllers/clientaddaddress');
// NOW ROUTERS FOR MARCHANT//   

const marchantRegister=require("../controllers/marchantControllers/marchantRegistar")
const marchantVerifyOTP=require("../controllers/marchantControllers/marchnatverifyOTP")
const marchantlogin=require("../controllers/marchantControllers/marchantlogin")
const marchantMoreInfo=require("../controllers/marchantControllers/marchantMoreInfo")


var bodyParser = require("body-parser");
// const {body} = require('express-validator')

// router
const router = require('express').Router()
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/registerClient",clientRegisterController.registerClient)

router.post("/loginClient",clientloginController.loginClient)
router.get("/clientverifyOTP",clientVerifyOTP.verifyOTP)
router.post("/clientaddress",clientaddaddress)

// marchant Roters

router.post("/registerMarchant",marchantRegister.registerMarchant)
router.get("/verifyMarchant",marchantVerifyOTP.marchantVerifyOTP)
router.post("/loginMarchant",marchantlogin.loginMarchant)
router.post("/updateMarchatInfo",marchantMoreInfo)


module.exports = router;