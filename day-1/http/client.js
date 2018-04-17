//Provides the foundation for creating http client.
const HTTP = require('http');

const HOST = '127.0.0.1', PORT = 3000;

const message = 'I didn\'t sleep the whole night to make it work!:)';

// The options for making request to the server.
let requestOptions = {
    hostname: HOST,
    port: PORT,
    method: 'POST',
};

//Makes a request (post type) and treats the response.
HTTP.request(requestOptions, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (data) {
        console.log('Server response: ' + data);
    });
}).write(message);