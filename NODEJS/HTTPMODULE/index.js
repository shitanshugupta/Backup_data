
// NOrmal creating a node js server for home pages

// const http=require('http')

// const server=http.createServer((req,res)=>{
//     res.end("Listening from other sides")
// });

// server.listen(8000,'localhost',()=>{
//     console.log("listening to the post 8000");
// })



//  Creating a node server with multiple routes

const fs = require("fs");
const http=require("http")

const server=http.createServer((req,res)=>{
    if(req.url == '/'){
        res.end("welcome to Home Page")
    }
    else if(req.url == '/About'){
        res.writeHead(200,{"content-type":"application/json"}) // in json response header chnages
        fs.readFile("filepath","utf-8",(err,data)=>{    // reading file from json1.json in asynchronous manner
            res.end(data)
        })
        res.end("welcome to About page")
    }
    else{
        res.writeHead(404,{"content-type":"text/html"})  //changes the response header to show status as 404
        res.end("<h1> 404 Error Page Not Found</h1>")
    }
});

server.listen(8000,"localhost",()=>{
    console.log("listening to the port 8000");
})