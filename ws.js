const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 40510 });

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