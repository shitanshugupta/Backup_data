const express=require("express")

const router=express.Router()
router.get("/student/all",(req,res)=>{
    res.send("all student")
});

router.post("/student/create",(req,res)=>{
    res.send("student created")
});
router.put("student/update",(req,res)=>{
    res.send("student updated")
})
router.delete("student/delete",(req,res)=>{       
    res.send("student deleted")
})

module.exports=router