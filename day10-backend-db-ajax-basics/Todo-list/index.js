const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const _ = require("lodash");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
/* End Auth*/

/* Passport init*/
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
/* End of init*/

/* Passport strategy*/
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let sql = "SELECT * FROM users WHERE id = '" + jwt_payload.id + "' ORDER BY id DESC";
    connection.query(sql, function (err, result) {
        var user = result[0];
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
});
passport.use(strategy);
/* End strategy*/

app.post("/login", function(req, res) {
    if(req.body.name && req.body.password){
        var name = req.body.name;
        var password = req.body.password;
    }
    let sql = "SELECT * FROM users WHERE user = '"+ name +"' ORDER BY id DESC";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        let user = result[0];
        if( ! user ){
            res.status(401).json({message:"no such user found"});
        }
        if(user.password === password) {
            // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
            let payload = {id: user.id};
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({message: "ok", token: token});
        } else {
            res.status(401).json({message:"passwords did not match"});
        }
    });
});
app.post("/register", function(req, res) {
    if (req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
        var sql = "INSERT INTO users (user, password) VALUES('" + name + "', '" + password + "')";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            res.status(200).send(result);
        });
    }
});

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo-list'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection Ok!");
});
handleDisconnect(connection);

function handleDisconnect(client) {
    client.on('error', function (error) {
        if (!error.fatal) return;
        if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

        console.error('> Re-connecting lost MySQL connection: ' + error.stack);

        mysqlClient = mysql.createConnection(client.config);
        handleDisconnect(mysqlClient);
        mysqlClient.connect();
    });
}

exports.connectToDataBase = function() {

    return connection;

};

/* static file */
app.use(express.static(path.join(__dirname, 'Todo-list/../')));
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '/login.html'));
});
app.get('/Auth_script.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/js/Auth_script.js'));
});
app.get('/img/background.jpg', (req, res) => {
    res.sendFile(path.join(__dirname + '/img/background.jpg'));
});

app.get('/css/style.css', (req, res) => {
    res.setHeader('content-type', 'text/css');
    res.sendFile(path.join(__dirname + '/css/style.css'));
});
app.get('/img/list.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/img/list.png'));
});
app.get('/img/list.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/img/list.png'));
});

app.get('/todo', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/index.html'));
});
app.get('/main.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/main.js'));
});
app.post('/show', (req, res) => {
    var values = req.body;
    let sql = "SELECT * FROM todo WHERE removed = 0 AND user = '"+ values.user +"' ORDER BY id DESC";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
app.post('/create', jsonParser, (req, res) => {
    var values = req.body;
    var sql = "INSERT INTO todo (task, user) VALUES('" + values.newTask + "', '" + values.user + "')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
    });
    sql = "SELECT * FROM todo ORDER BY id DESC LIMIT 1";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
app.post('/delete', passport.authenticate('jwt', { session: false }), jsonParser, (req, res) => {
    let values = Number(req.body.delete);
    let sql = "UPDATE todo SET removed = 1 WHERE id = " + values + ";";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.listen("3000", () => {
    console.log("Server works!");
});