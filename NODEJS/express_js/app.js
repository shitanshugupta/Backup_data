const express=require("express")

const app=express()

app.get("/",(req,res)=>{
    res.send("welcome to the home page of express")
});

app.get("/about",(req,res)=>{
    res.status(404).send("welcome to the about page of express")
});
app.all("*",(req,res)=>{
    res.send("any page")
})
app.all("/api/*",(req,res)=>{       // fi we write till api in url it will not work show cannot get
    res.send("a")
})
app.listen(8000,()=>{
    console.log("listening to the request at port 8000");
});