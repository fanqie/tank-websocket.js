const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 19198});

wss.on('connection', function connection(ws) {
    const subscriptions = new Set();

    ws.on('message', function incoming(message) {
        const msg = message.toString();

        if (msg === "please disconnect me!") {
            ws.close();
            return;
        }

        if (msg.startsWith('sub:')) {
            const topic = msg.substring(4);
            subscriptions.add(topic);
            console.log('Client subscribed to:', topic);
            return;
        }

        if (msg.startsWith('unsub:')) {
            const topic = msg.substring(6);
            subscriptions.delete(topic);
            console.log('Client unsubscribed from:', topic);
            return;
        }
        setTimeout(() => {
            // 模拟发送订阅消息
            if (subscriptions.size > 0) {
                subscriptions.forEach(topic => {
                    const response = `sub:${JSON.stringify({
                        topic: topic,
                        data: msg
                    })}`
                    console.log('Sending response:', response);
                    ws.send(response);
                });
            }
        }, 100)

    });
});
