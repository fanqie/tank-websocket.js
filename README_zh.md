* [English](README_zh.md)|中文

## 描述

tank-websocket.js 是一个稳定的websocket客户端插件，具有一些非常酷的特性

## 特征

- [x] 支持多个实例/单个案例，单页应用程序中的全局单例模式
- [x] 支持commonjs，es6导入两种导入模式
- [x] 支持自动重新连接机制
- [x] 支持事件侦听器
- [x] 0个依赖项
- [x] 单元测试高覆盖率
- [x] 支持浏览器

## install

```shell
npm install tank-websocket.js
// or
yarn add tank-websocket.js
```

## 导入

### commonjs

```javascript
const TankWebSocket = require("tank-websocket.js");
//或
const {SocketClient, useSocketClient} = require("tank-websocket.js");
```

### ES6+ 导入

```javascript
import TankWebSocket from "tank-websocket.js";
//或
import {SocketClient, useSocketClient} from "tank-websocket.js";
```

### html 标签导入

```html

<script src="https://unpkg.com/tank-websocket.js/lib/"></script>
```

## 初始化

### 多实例创建

```javascript
const twsc = new TankWebSocket.SocketClient('ws://127.0.0.1:19198');
twsc.onOpen((event) => {
    console.log("on open", event)
})
```

### 单例创建

单页应用程序中的全局单例模式

```javascript
//main.js
import TankWebSocket from "tank-websocket.js";

TankWebSocket.useSocketClient('ws://127.0.0.1:19198');

//其他文件
import TankWebSocket from "tank-websocket.js";

TankWebSocket.useSocketClient().onOpen((event) => {
    console.log("on open", event)
})
```

## 例子

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
     * 发送消息
     */
    twsc.send("hello tank man")
    //或 json data
    twsc.send(JSON.stringify({value: "hello tank man"}))

    /**
     * 主动关闭链接
     */
    twsc.close()
    //或
    twsc.disconnect()
})

twsc.onError((event) => {
    console.log("on error", event)
})
twsc.onClose((event) => {
    console.log("on close", event)
})
/**
 * 获取浏览器原始ws对象
 */
console.log(twsc.ws)
/**
 * 关闭调试模式，控制台不会打印消息
 */
twsc.setDebug(false)
/**
 * 设置单次重连间隔时间 (默认:1000 ms)
 */
twsc.setReConnectInterval(1000)

/**
 * 禁止断开重试链接
 */
twsc.disableReConnect(true)

/**
 * 获取原始的 WebSocket 对象 [新增]
 */
const ws = twsc.getOriginInstance();
/**
 * 检测链接是否关闭 [新增]
 */
twsc.isClose();
/**
 * 检测链接是否正在连接 [新增]
 */
twsc.isConnecting();
/**
 * 检测链接是否打开 [新增]
 */
twsc.isOpen();
/**
 * 检测链接是否正在关闭 [新增]
 */
twsc.isClosing();
```

## 关于订阅
tank-websocket.js支持订阅功能，你可以使用它订阅服务端的消息，然后通过回调函数接收消息。
### 服务端获取订阅消息载体格式
`sub:topicName`
### 服务端发送给客户端消息格式
```json
{
    "topic":"topicName",
    "data":"dataValue"
}
```
### 服务端如何获取订阅主题
这里使用javascript进行示例，其他语言请自行实现

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
            // 模拟发送订阅消息
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

### 客户端使用

```javascript
import TankWebSocket from "tank-websocket.js";

const twsc = new TankWebSocket.SocketClient('ws://127.0.0.1:19198');
//订阅一个主题
twsc.subTopic('topic', (data) => {
    console.log(data)
})
//取消订阅
twsc.unsubTopic('topic')
//销毁所有主题
twsc.destroyTopics()
```

## Apis

[socketClient](./types/socketClient.d.ts)
