const express=require("express")
const mysql=require("mysql2")
const bodyParser=require("body-parser")

const app=express()
const port=process.env.PORT || 8000

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


// MySql

const pool=mysql.createPool({
    connectionLimit:10,
    host           :'localhost',
    user           :'harry',
    password       :"11111",
    database       :'CRUD_APP'

})

app.get("",(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`connected at id ${connection.threadId}`);
        
        connection.query('SELECT * from crud',(err,rows)=>{
            connection.release()
            if(!err){
                res.send(rows)
            }
            else{
                console.log(err);
            }
        })
    })
})



app.get("/:id",(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`connected at id ${connection.threadId}`);
        
        connection.query('SELECT * from crud WHERE id = ?',[req.params.id],(err,rows)=>{
            connection.release()
            if(!err){
                res.send(rows)
            }
            else{
                console.log(err);
            }
        })
    })
})


app.delete("/:id",(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`connected at id ${connection.threadId}`);
        
        connection.query('DELETE from crud WHERE id = ?',[req.params.id],(err,rows)=>{
            connection.release()
            if(!err){
                res.send(`the row is been deleted with ID ${req.params.id}`)
            }
            else{
                console.log(err);
            }
        })
    })
})



app.post("",(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`connected at id ${connection.threadId}`);

        const params=req.body

        connection.query('INSERT INTO crud SET ?', params ,(err,rows)=>{
            connection.release()
            if(!err){
                res.send(`the row  with ID ${params.id} is been added`)
            }
            else{
                console.log(err);
            }
        })
        console.log(req.body);
    })
})


app.put("",(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`connected at id ${connection.threadId}`);


        const {id,First_Name,Last_Name,Age}=req.body

        connection.query('UPDATE crud SET First_Name = ? WHERE id = ?',[First_Name,id] ,(err,rows)=>{
            connection.release()
            if(!err){
                res.send(`the row  with ID is been updated`)
            }
            else{
                console.log(err);
            }
        })
        console.log(req.body);
    })
})



// listen on environment port or 8000

app.listen(port,()=>{
    console.log(`listen on port ${port}`);
})