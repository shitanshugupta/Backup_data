const express = require('express')
const app = express()
var nrc = require('node-run-cmd');
const CONTRACT=require('./environment/deployAddress.json')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Controller
app.get("/deploy", async(req, res) => {
   const value=await nrc.run('npx hardhat run --network goerli scripts/deploy.js')
   console.log(value);
    res.json({ "status": CONTRACT.CONTRACT_ADDRESS })
    console.log("hello");
    
})

//port
const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
