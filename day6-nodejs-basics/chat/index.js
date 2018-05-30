const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.broadcast.emit('chat message', 'A new user connected');
    socket.on('chat message', function(msg){
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        socket.broadcast.emit('chat message', 'User disconnected');
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

//todo:
//Add support for nicknames
//Add “{user} is typing” functionality
//Show who’s online
//Add private messaging