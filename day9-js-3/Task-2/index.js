const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

/* An array with connected users (sockets) */
let connectedUsers = [];
/* A counter that shows an amount of user's clicks during his "active" time. */
let counter = 0;

/* Monitors the time left for each user in the queue. */
function notifyTimeLeft() {
    let secondsLeft = 60;
    let secondsTimer = setInterval(() => {
        if (secondsLeft > 0) {
            secondsLeft--;
        } else {
            clearInterval(secondsTimer);
        }
        for (let i = 0; i < connectedUsers.length; i++) {
            connectedUsers[i].emit('time left', secondsLeft + (60 * i));
        }
    }, 1000)
}

/* Sets the 'active' user during the each 60 seconds.*/
function processUser() {
    let active = connectedUsers[0];
    let localCounter = counter = 0;
    active.emit('active', () => {
    });
    notifyTimeLeft();
    setInterval(() => {
        if (localCounter < counter) {
            localCounter = counter;
            active.emit('counter', counter);
        }
    }, 50);
}

/* Changes 'active' user to the next in the queue and gives him 60 seconds.*/
function setNextActive() {
    setTimeout(() => {
        if (connectedUsers.length > 0) {
            let lastActive = connectedUsers.shift();
            connectedUsers.push(lastActive);
            lastActive.emit('wait', () => {});
            processUser();
        }
        setNextActive();
    }, 60000);
}

/* Waits for the first connected user in order to start processing. */
let checkOnFirstConnect = setInterval(() => {
    if (connectedUsers.length > 0) {
        processUser();
        setNextActive();
        clearInterval(checkOnFirstConnect);
    }
}, 50);

io.on('connection', (socket) => {
    console.log('New user connected[key: ' + socket.id + ']');
    connectedUsers.push(socket);

    socket.on('click', () => {
        counter++;
    });

    socket.on('disconnect', () => {
        console.log('User disconnected[key: ' + socket.id + ']');
        let userArrId = connectedUsers.indexOf(socket);
        connectedUsers.splice(userArrId, 1)
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
