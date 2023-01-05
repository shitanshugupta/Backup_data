const express = require("express")
const mongoose = require("mongoose")
const Alien = require('../Backend/models/schema')
const url = "mongodb://localhost/Alien"
const PORT = process.env.PORT || 8000
const app = express()
app.use(express.json())

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection
con.on('open', () => {
    console.log("connected......");
})

app.get('/', async (req, res) => {
    try {
        const data = await Alien.find()
        res.send({ data: data })
    
    } catch (error) {
        res.send({ status: error })
    }
})
 
app.post('/', async (req, res) => {
    const data1 = new Alien({
        name: req.body.name,
        address: req.body.address
    })
    try {
        const result = await data1.save()
        res.send({ data: result })
    } catch (error) {
        res.send({ status: error })
    }
})
const index=async((req,res,next)=>{
    await 
})
app.listen(PORT, () => {
    console.log("connected to server");
})