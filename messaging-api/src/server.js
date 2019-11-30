var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const path  = require('path')

var users = {};
var connections = {};
// Started server to listen on port 3001
var storeMessageData = require('./StoreMessageData.js')
let userdata = new storeMessageData()

server.listen(process.env.PORT || 3001, () =>
{
console.log("Server started successfully on port 3001")
});

app.use(express.static(path.join(__dirname,'../Node-client-test')))

io.on('connection',(socket) =>
{
    socket.on('ConnectToChat',(username) =>{
        console.log("New websocket connection created")
        users[username] = socket.id
        connections[socket.id] = username
    })

    socket.on('sendMessage',(usernameToSend,message, callback) =>
    {
        messageToSend = 
        {
            sentBy: connections[socket.id],
            message: message
        }
        if(usernameToSend in users)
        {
        io.to(users[usernameToSend]).emit('message',messageToSend)
        callback('Message delivered')
        }
        else
        {
            userdata.storeMessage(usernameToSend,messageToSend)
            callback('Message delivered to server')
        }
    })

    socket.on('disconnect', () =>{
        io.emit('message', "User has left")
        userDisconnected = connections[socket.id]
       /* connections.delete(socket.id)
        users.delete(userDisconnected) 
        console.log(users)
        console.log(connections)*/
    })

    socket.on('sendMyLocation',(message) =>
    {
        io.emit('message',message)
    })
})

