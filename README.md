* English|[中文](README_zh.md)
* 
## Introduction

tank-websocket.js is a stable websocket client plugin with some really cool features

## feature

- [x] support multiple instances/single cases, the global singleton mode in single page application
- [x] support commonjs require, es6 import two import modes
- [x] automatic reconnect mechanism
- [x] event listener
- [x] 0 dependencies
- [x] high coverage unit tests
- [x] support browser

## install

```shell
npm install tank-websocket.js
// or
yarn add tank-websocket.js
```

## import

### commonjs

```javascript
const TankWebSocket = require("tank-websocket.js");
//or
const {SocketClient, useSocketClient} = require("tank-websocket.js");
```

### ES6+ import

```javascript
import TankWebSocket from "tank-websocket.js";
//or
import {SocketClient, useSocketClient} from "tank-websocket.js";
```

### html tag

```html

<script src="https://unpkg.com/tank-websocket.js/lib/"></script>
```

## init instance

### multiple instances

```javascript
const twsc = new TankWebSocket.SocketClient('ws://127.0.0.1:19198');
twsc.onOpen((event) => {
    console.log("on open", event)
})
```

### single instance

the global singleton mode in single page application

```javascript
//main.js
TankWebSocket.useSocketClient('ws://127.0.0.1:19198');
//other
TankWebSocket.useSocketClient().onOpen((event) => {
    console.log("on open", event)
})
```

## examples

```javascript
import TankWebSocket from "tank-websocket.js";

const twsc = new TankWebSocket.SocketClient('ws://127.0.0.1:19198');

twsc.onOpen((event) => {
    console.log("on open", event)
    twsc.onMessage((event) => {
        console.log("on error", event.data)
        // console.log("on error",JSON.parse(event.data)); //json data
    })
    /**
     * send message
     */
    twsc.send("hello tank man")
    //or json data
    twsc.send(JSON.stringify({value: "hello tank man"}))

    /**
     * close ws connect
     */
    twsc.close()
    //or
    twsc.disconnect()
})

twsc.onError((event) => {
    console.log("on error", event)
})
twsc.onClose((event) => {
    console.log("on close", event)
})
/**
 * get original websocket
 */
console.log(twsc.ws)
/**
 * close debugger ,close output on console
 */
twsc.setDebug(false)
/**
 * set reConnect setInterval (default:1000 ms)
 */
twsc.setReConnectInterval(1000)

/**
 * disable disconnecting retry links
 */
twsc.disableReConnect(true)
/**
 * Get the Origin WebSocket instance [new]
 */
const ws=twsc.getOriginInstance();
/**
 * Check if the link is closed [new]
 */
twsc.isClose();
/**
 * Check if the link is connecting [new]
 */
twsc.isConnecting();
/**
 * Check if the link is open [new]
 */
twsc.isOpen();
/**
 * Check if the link is closing [new]
 */
twsc.isClosing();

```
## About Subscription
tank-websocket.js support subscription, you can use it to subscribe to the server's message, and then receive the message through the callback function.

### The format of the subscription message carrier obtained by the server
`sub:topicName`
### The format of the message sent by the server to the client
```json
{
    "topic":"topicName",
    "data":"dataValue"
}
```
### How to obtain the subscription topic on the server
Here we use javascript for examples, please implement it yourself in other languages
```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 19198});

wss.on('connection', function connection(ws) {
    const subscriptions = new Set();

    ws.on('message', function incoming(message) {
        const msg = message.toString();

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
        setInterval(() => {
            // mock server send message to client
            if (subscriptions.size > 0) {
                subscriptions.forEach(topic => {
                    const response = JSON.stringify({
                        topic: topic,
                        data: msg
                    })
                    console.log('Sending response:', response);
                    ws.send(response);
                });
            }
        }, 1000)

    });
});

```

### Client Usage
```javascript
// subscribe
twsc.subscribe("test",(data)=>{
    console.log(data)
})
// unsubscribe
twsc.unsubscribe("test")
// unsubscribe all
twsc.unsubscribeAll()
```

## Apis
[socketClient](./types/socketClient.d.ts)
