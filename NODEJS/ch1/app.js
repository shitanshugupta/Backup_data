const express=require("express")
const app=express()

const stu=require("./routes/student.js")
app.use("/hello",stu)

app.listen(8000,()=>{
    console.log("listening to the request at port 8000");
});