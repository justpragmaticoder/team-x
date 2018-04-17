//Provides the foundation for connection to the TCP server.
const TCP = require('net');

const HOST = '127.0.0.1', PORT = 3000;

let client = new TCP.Socket().connect(PORT, HOST, function () {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Writes a message to the server as soon as the client is connected.
    client.end('I didn\'t sleep the whole night to make it work!:)');
});

// Adds a 'data' event handler.
client.on('data', function (data) {
    console.log('Server response: ' + data);
    // Closes the connection to the server completely.
    client.destroy();
});

// Adds a 'close' event handler.
client.on('close', () => console.log('Connection closed.'));