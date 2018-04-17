//Provides the foundation for creating http server.
const HTTP = require('http');

const HOST = '127.0.0.1', PORT = 3000;

// Creates a server instance, and chain the listen function to it.
HTTP.createServer().listen(PORT, HOST, () => {
    console.log(getTime() + 'The server is listening on ' + HOST + PORT);
}).on('request', function (request, response) {
    // Adds a 'data' event handler.
    request.on('data', function (message) {
        console.log(getTime() + 'CLIENT MESSAGE:' + message);
        response.end('You said "' + message + '".');
    });
});

//Returns the current time with brackets.
function getTime() {
    let date = new Date();
    let timeArray = [date.getHours(), date.getMinutes(), date.getSeconds()];
    for (let i = 0; i < timeArray.length; i++) {
        if (timeArray[i] < 10) timeArray[i] = '0' + timeArray[i];
    }
    return '[' + timeArray.join(':') + ']';
}