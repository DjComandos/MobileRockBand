var path = require('path'),
    express = require('express'),
    port = process.env.PORT || 8080,
    app = express(),
    server = require('http').createServer(app);


app.use(express.static(path.join(__dirname, 'static')));

server.listen(port);