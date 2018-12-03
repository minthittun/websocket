'use strict';
var express = require('express')
const SocketServer = require('ws').Server;
var PORT = process.env.PORT || 1337;
var app = express()

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
// Broadcast to all.
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        // Broadcast to everyone else.
        console.log("Message", data)
        wss.clients.forEach(function each(client) {
            //if (client !== ws && client.readyState === WebSocket.OPEN) {
            //    client.send(data);
            //}
            client.send(data);
        });
    });
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/ws.html');
})

app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT + '!')
})