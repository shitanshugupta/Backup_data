const express=require('express');
const cors=require('cors')
const router = require('./routes/routes');

const app=express();
const port=process.env.PORT||8000
require('./config/connectionDB')


//middleware
app.use(express.json())
app.use(cors())

app.use('/api/user',router)

//Server
app.listen(port,()=>{
    console.log("server running on port 8000");
})