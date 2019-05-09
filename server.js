var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var ObjectId = require('mongodb').ObjectID;
var crypto = require('crypto');
var dbFunctions = require('./dbfunctions');
var users = require('./mock/users/users');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 80;
var userFunctions = {
    loadMockUsers: function (res) {
        users.forEach(function (item) {
            dbFunctions.insert(item, function () {
                console.log('inserted user');
            });
        });
        res.send('inserted');
    }
};

app.use(express.static(__dirname + '/public'));

app.use(bodyparser.urlencoded({
    extended: false
}));

app.get('/loadMockUsers', function (req, res) {
    userFunctions.loadMockUsers(res);
});

app.get('/', function (req, res) {
    console.log('connection');
    res.send('hello...');
});

io.on('connection', function (socket) {
    console.log('new');
    console.log(socket.id);
    console.log(socket.auth);

    socket.on('auth', function (data) {
        socket.auth = true;
        socket.emit('done');
    });

    socket.on('show', function (data) {
        console.log(socket.auth);
    });
});


http.listen(port, function () {
    console.log('listening on port ', port);
});
