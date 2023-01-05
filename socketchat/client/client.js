const socket=io('http://localhost:8000',{ autoConnect: false })

const form=document.getElementById('send-container')
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")

const append=(message,position)=>{
    const element=document.createElement("div")
    element.innerText=message
    element.classList.add("message")
    element.classList.add(position)
    messageContainer.append(element)
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value
    append(`You:${message}`,"right")
    messageInput.value=''
    socket.emit('send',message)
})
const name=prompt("enter the name")
socket.emit('new-user',name)
socket.on('user',(name)=>{
    append(`${name} joined the chat`,"right")
})

socket.on('receive',(data)=>{
    append(`${data.name}:${data.message}`,'left')
})
