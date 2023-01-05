const express=require("express");
const router = require('./route/clientRouter')
const app=express();

const PORT=9000;

app.use(router)

app.use("/",(req,res)=>{
    // res.send("Hello this is my first project")
})




app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})
