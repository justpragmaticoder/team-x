const http = require('http');
const fs = require('fs');
const index = fs.readFileSync('day2-html-css-basics/index.html');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
}).listen(3000);