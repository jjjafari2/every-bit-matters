var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

io.on('connect', function (socket) {
    console.log('Looksies! We got ourselves a user!');

    socket.on('speedtest:results', function (data) {
        console.log("speedtest:results");
        io.emit('speedtest:display', data);
    });
});

setInterval(function () {
    io.emit('speedtest:run');
}, 30000);

app.use('/', express.static('client'));

http.listen(port, function () {
    console.log('Running our app at http://localhost:3000')
});