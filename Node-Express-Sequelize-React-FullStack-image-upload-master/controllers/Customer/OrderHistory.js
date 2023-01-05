const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const jwt=require('jsonwebtoken')
const db = require("../../models")

const OrderHistory=async(req,res)=>{
    const{authorization}=req.headers
    if((authorization)&&(authorization.startsWith('Bearer'))){
        try {
            const SECRETKEY='SECRETKEY'
            const token=authorization.split(' ')[1]
            const {user_email}=jwt.verify(token,SECRETKEY)
            console.log("hello1");
            const UserRow=await db.Users.findOne({
                where:{
                    email:user_email
                }
            })

            const CartRows=await db.Carts.findAll({
                attributes:['HSN_CODE','Product_name','Quantity_order','price',
                'Total_Amount','User_id','Merchant_id','Product_id'],
                where:{
                    User_id:UserRow.id
                }
            })
            console.log(CartRows.length);
            const {id}=await db.Orders.findOne({
                where:{
                    User_id:UserRow.id
                }
            })
            console.log(id);
            // console.log(id);
            // console.log(CartRows.length);
            // CartRows[0].dataValues.Order_id=id
            // console.log(CartRows[0]);
            let ar=[]
            for(let i=0;i<CartRows.length;i++){
                CartRows[i].dataValues.Order_id=id
                ar[i]=CartRows[i].dataValues
                console.log(ar);
                
            }
            await db.OrderHistorys.bulkCreate(ar)
            res.status(200).send({"status":"success","message":"Orders placed Succesfully"})
            
        } catch (error) {
            res.status(400).send({"error":error})
            
        }
    }else{
        res.status(400).send({"status":"failed","messsage":"Token is not valid"})
    }
}
module.exports=OrderHistory