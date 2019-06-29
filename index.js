const express = require('express')
const app = express()
var http =  require ('http').createServer(app);
var io =require ('socket.io')(http);

app.get('/', (req, res) =>  res.sendFile(__dirname + '/index.html'));


io.on('connection', function(socket){
    socket.broadcast.emit('hi');
    socket.on('chat message' , function(msg){
        console.log('message:'+ msg);
        io.emit('chat message', msg)
    });
});
io.emit('some event', {for: 'everyone'});
http.listen(3000, function () {
    console.log('listening on *:3000')
})