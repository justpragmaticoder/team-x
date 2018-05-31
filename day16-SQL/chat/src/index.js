const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const knex = require('./db/knex_db_connection.js');
const router = require('./routes/routes.js');

app.use('/', router);

let connectedUsers = {};

io.on('connection', (socket) => {
    socket.on('nickname', (nickname) => {
        if (nickname) {
            connectedUsers[socket.id] = nickname;
            socket.broadcast.emit('user connection', makeJsonMsg(nickname, 'A new user connected'));
        }
    });
    socket.on('chat message', (msg) => {
        let userNick = connectedUsers[socket.id];
        if (userNick) {
            io.emit('chat message', makeJsonMsg(userNick, msg));
            knex('mhistory').insert({nickname: userNick, text: msg}).then();
        }
    });
    socket.on('disconnect', () => {
        if (connectedUsers[socket.id]) {
            socket.broadcast.emit('user connection', makeJsonMsg(connectedUsers[socket.id], 'User disconnected'));
            delete connectedUsers[socket.id];
        }
    });

});

function makeJsonMsg(nick, msg) {
    return JSON.stringify({
        nickname: nick,
        message: msg
    })
}

http.listen(3000, function () {
    console.log('listening on *:3000');
});

//todo:
//Add “{user} is typing” functionality
//Show who’s online
//Add private messaging