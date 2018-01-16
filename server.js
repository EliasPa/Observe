var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static')

server.listen(process.env.PORT || 3000)

app.use(express.static(__dirname + '/'))
app.use(cors())
app.use(express.json())