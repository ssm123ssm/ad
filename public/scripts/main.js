$(function () {
    console.log('ready');
    var socket = io();
    socket.emit('auth');
    socket.on('done', function (data) {
        socket.emit('show');
        console.log(socket.auth);
    });
});
