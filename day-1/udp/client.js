//Provides the foundation for creating UDP client.
const UDP = require('dgram');

const HOST = "127.0.0.1", CLIENTPORT = 3001, SERVERPORT = 3000,
    message = 'I didn\'t sleep the whole night to make it work!:)';

const client = UDP.createSocket('udp4');

client.on("message", function (answer) {
    console.log('SERVER RESPONSE: ' + answer.toString());
    client.close(() => {
        console.log('CONNECTION CLOSED.');
    })
});

// Listens to the port.
client.bind(CLIENTPORT, HOST);

// Sends a message to the server.
client.send(message, 0, message.length, SERVERPORT, HOST);