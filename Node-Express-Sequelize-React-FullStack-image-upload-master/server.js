const express = require('express')
const cors = require('cors')
const paypal=require('paypal-rest-sdk')

const app = express()

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


// routers
const customerrouter = require('./routes/CustomerRoutes/userRouter.js')
const merchantrouter = require('./routes/MerchantRoutes/merchantroutes.js')
const admin = require('./routes/AdminRoutes/Adminroutes.js')

app.use('/api/customer', customerrouter)
app.use('/api/merchant', merchantrouter)
app.use('/api/admin', admin)

//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)

})
app.get('/',(req,res)=>{
    res.sendFile('standard.html',{root:__dirname})
})
app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})