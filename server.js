var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    members = {};

app.configure(function(){
    app.set('port', process.env.PORT || 8080);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'static')));
});


app.get('/', routes.index);
app.get('/piano.html', routes.piano);
app.get('/listen', routes.listen);

server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});


io.sockets.on('connection', function (socket) {

    socket.on('play',function(data){
        io.of('/listens').emit('play', data);
    });
});