const WebSocket = require('ws');
var port = process.env.PORT || 1337;
const wss = new WebSocket.Server({ port: port });

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