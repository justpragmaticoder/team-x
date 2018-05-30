const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname)));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '1',
        database: 'chat'
    }
});

let connectedUsers = {};

io.on('connection', (socket) => {
    socket.on('nickname', (nickname) => {
        if (nickname) {
            connectedUsers[socket.id] = nickname;
            socket.broadcast.emit('chat message', makeJsonMsg(nickname, 'A new user connected'));
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
            socket.broadcast.emit('chat message', makeJsonMsg(connectedUsers[socket.id], 'User disconnected'));
            delete connectedUsers[socket.id];
        }
    });

});

app.get('/short-history', (req, res) => {
    knex.select().from('mhistory').orderBy('id', 'desc').limit(10).then((records) => {
        res.send(records);
    });
});

app.post('/next-messages', jsonParser, (req, res) => {
    let lastMsgId = req.body.msgId;
    knex.select().from('mhistory').where('id', '<', lastMsgId).orderBy('id', 'desc').limit(10).then((records) => {
        res.send(records);
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