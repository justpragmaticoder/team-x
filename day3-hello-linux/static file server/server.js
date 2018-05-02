const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'day2-html-css-basics')));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

app.listen("8080", () => {
    console.log("Server works!");
});
