const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 19198});

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        if (message.toString() === "please disconnect me!") {
            ws.close()
            return
        }
        console.log('Received message:', message.toString());
        ws.send(message.toString());

    });

});
