//Provides the foundation for creating UDP server.
const UDP = require('dgram');

const HOST = "127.0.0.1", PORT = 3000;

const server = UDP.createSocket("udp4");

console.log(getTime() + 'The server is listening on ' + HOST + ":" + PORT);

// Adds a 'message' event handler.
server.on("message", function (message, clientInfo) {
    let clientHostPort = clientInfo.address + ':' + clientInfo.port;

    console.log(getTime() + 'CONNECTED CLIENT: ' + clientHostPort);
    console.log(getTime() + 'MESSAGE FROM ' + clientHostPort + ': "' + message + '"');

    //Sends a message to the client (the same as received) and closes connection afterwards.
    server.send(message, 0, message.length, clientInfo.port, clientInfo.address, () => {
        server.close(() => {
            console.log(getTime() + 'CONNECTION CLOSED.');
        })
    });
});
// Listens to the port.
server.bind(PORT, HOST);

//Returns the current time with brackets.
function getTime() {
    let date = new Date();
    let timeArray = [date.getHours(), date.getMinutes(), date.getSeconds()];
    for (let i = 0; i < timeArray.length; i++) {
        if (timeArray[i] < 10) timeArray[i] = '0' + timeArray[i];
    }
    return '[' + timeArray.join(':') + ']';
}