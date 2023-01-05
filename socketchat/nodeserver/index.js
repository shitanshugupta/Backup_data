// const http = require('http');
// const express = require('express');
// const app = express();
// const server = http.createServer(app)
// const io = require('socket.io')(server,{
//     cors:{
//         origin:"*"
//     }
// });
// const users={}
// io.on('connection',socket=>{
//     socket.on('new-user',(name)=>{
//         console.log(name);
//         users[socket.id]=name
//         console.log(users);
//         socket.broadcast.emit('user',name)
//     })
//     socket.on('send',(message)=>{
//         socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
//     })
// })
    
// server.listen(8000,()=>{
//     console.log('server is running');
// })
socket={
    auth:{
        token:123
    }
}
a="hello"
console.log(socket,"line 32");
console.log(socket.auth);
socket.auth={a}
console.log(socket);