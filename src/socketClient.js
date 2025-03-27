class SocketClient {
    /**
     * WebSocket instance
     * @type {WebSocket|null}
     */
    ws = null
    events = {
        open: new Set(),
        message: new Set(),
        error: new Set(),
        close: new Set(),
    }
    debug = true
    lastReConnTime = new Date().getTime();
    interval = 1000
    url = ""
    useReConn = true
    topics = []

    /**
     * Create a WebSocket instance
     * @param url {string} WebSocket url
     */
    constructor(url) {
        this.useReConn = true
        this.setDebug(true)
        this.setReConnectInterval(1000)
        this.url = url
        this.ws = new WebSocket(url)
        this.checkConn()
        this._defineEvents()


        this.onOpen((event) => {
            if (this.debug) {
                console.log("socket open", event)
            }
            this._sendScribeToServer()
        })

        this.onClose((event) => {
            if (this.debug) {
                console.log("socket close", event)
            }
        })
        this.onMessage((event) => {
            if (this.debug) {
                console.log("socket receive", event)
            }
            this._subscribeOnMessageReceive(event)
        })
        this.onError((event) => {
            if (this.debug) {
                console.log("socket exception", event)
            }
        })

    }

    _sendScribeToServer() {
        this.topics.forEach(t => {
            this.send(`sub:${t.topic}`)
        })
    }

    /**
     * Handle the message received by the WebSocket instance
     * @param event {MessageEvent}
     * @private
     */
    _subscribeOnMessageReceive(event) {
        if (event.data.indexOf("topic") <1) {
            return
        }
        try {
            const jsonData =JSON.parse(event.data)
            jsonData.topic&&this._subscribeOnMessageHandle(jsonData);
        }catch (e){
            console.error("error", e)
        }
    }

    /**
     * Handle the message
     * @param res {{topic: string, data: string}}
     * @private
     */
    _subscribeOnMessageHandle(res) {
        console.log("topic", res.topic, "data", res.data)
        this.topics.forEach(t => {
            if (t.topic === res.topic) {
                t.callback(res.data)
            }
        })
    }

    /**
     * Check the connection status of the WebSocket instance
     * @private
     */
    checkConn() {
        setTimeout(() => {
            if (this.useReConn && this.ws && this.ws.readyState > 1 && (new Date().getTime() - this.lastReConnTime) > this.interval) {
                console.log("reconnect socket=》》》", this.url)
                this.ws = new WebSocket(this.url)
                this._defineEvents()
            }
            if (this.ws) {
                this.checkConn()
            }
        }, 1000)
    }

    /**
     * Define event listeners
     * @private
     */
    _defineEvents() {
        this.ws.addEventListener('message', (event) => {
            this._emitMessage.call(this, event)
        });
        this.ws.addEventListener('open', (event) => {
            this.lastReConnTime = new Date().getTime()
            this._emitOpen.call(this, event)
        });
        this.ws.addEventListener('close', (event) => {
            this._emitClose.call(this, event)
        });

        this.ws.addEventListener('error', (event) => {
            this._emitError.call(this, event)
        });
    }

    /**
     * Get the WebSocket instance
     * @return {WebSocket|null}
     */
    getOriginInstance() {
        return this.ws;
    }

    /**
     *  Set whether to print the log
     * @param debug {boolean}
     */
    setDebug(debug) {
        this.debug = debug
    }

    /**
     * Disable disconnecting retry links
     * @param disable {boolean}
     */
    disableReConnect(disable = false) {
        this.useReConn = !disable
    }

    /**
     * set reConnect setInterval (default:1000 ms)
     * @param   interval {number} ms
     */
    setReConnectInterval(interval) {
        this.interval = interval
    }

    /**
     * data a text string, ArrayBuffer or Blob
     * @param data {string | ArrayBufferLike | Blob | ArrayBufferView}
     */
    send(data) {
        try {
            this.ws.send(data)
        } catch (e) {
            console.log(e)
        }

    }

    /**
     * Close the link same disconnect
     */
    close() {
        this.destroyTopics()
        this.useReConn = false
        this.ws.close()
        this.ws = null
        this.events = {
            open: new Set(),
            message: new Set(),
            error: new Set(),
            close: new Set(),
        }

    }

    /**
     * Disconnect the link
     */
    disconnect() {
        this.close()
    }

    /**
     * Check if the link is closed
     * @return {boolean}
     */
    isClose() {
        return this.ws.readyState === WebSocket.CLOSED;
    }

    /**
     * Check if the link is connecting
     * @return {boolean}
     */
    isConnecting() {
        return this.ws.readyState === WebSocket.CONNECTING;
    }

    /**
     * Check if the link is open
     * @return {boolean}
     */
    isOpen() {
        return this.ws.readyState === WebSocket.OPEN;
    }

    /**
     * Check if the link is closing
     * @return {boolean}
     */
    isClosing() {
        return this.ws.readyState === WebSocket.CLOSING;
    }

    /**
     * Listen to the link success event, with superimposed features
     * @param func {(evt: Event)=>void}
     */
    onOpen(func) {
        if (typeof func === "function") {
            this.events.open.add(func)
        }
    }

    /**
     * Listen to the link success event, with superimposed features
     * @param event {string}
     * @private
     */
    _emitOpen(event) {
        this.events.open.forEach((func) => {
            func(event)
        })
    }

    /**
     *
     * @param event {CloseEvent}
     * @private
     */
    _emitMessage(event) {
        this.events.message.forEach((func) => {
            func(event)
        })
    }

    /**
     * Listen to message acquisition events, with superimposed features
     * @param func {(evt: MessageEvent)=>void}
     */
    onMessage(func) {
        if (typeof func === "function") {
            this.events.message.add(func)
        }
    }

    /**
     * Monitor abnormal events, with superimposed features
     * @param func {Function}
     */
    onError(func) {
        if (typeof func === "function") {
            this.events.error.add(func)
        }
    }

    /**
     *
     * @param event {CloseEvent}
     * @private
     */
    _emitError(event) {
        this.events.error.forEach((func) => {
            func(event)
        })
    }

    /**
     * Listen for link closing events, with superimposed features
     * @param func {(evt: CloseEvent)=>void}
     */
    onClose(func) {
        if (typeof func === "function") {
            this.events.close.add(func)
        }
    }

    /**
     *
     * @param event {CloseEvent}
     * @private
     */
    _emitClose(event) {
        this.events.close.forEach((func) => {
            func(event)
        })
    }

    /**
     * Clear all listener link close events
     */
    offCloseEvent() {
        this.events.close.clear()
    }

    /**
     * Clear all exception event listeners
     */
    offErrorEvent() {
        this.events.error.clear()
    }

    /**
     * Clear all listener messages to get events
     */
    offMessageEvent() {
        this.events.message.clear()
    }

    /**
     * Clear all listener link success events
     */
    offOpenEvent() {
        this.events.open.clear()
    }

    /**
     * Subscribe to a topic
     * @param topic {string}
     * @param callback {(data: string)=>void}
     */
    subTopic(topic, callback) {
        if (!this.topics.includes(topic)) {
            this.topics.push({topic, callback})
            this.send(`sub:${topic}`)
        }
    }

    /**
     * Unsubscribe to a topic
     * @param topic {string}
     */
    unsubTopic(topic) {
        if (!this.topics.includes(topic)) {
            this.topics = this.topics.filter(t => t.topic !== topic)
            this.send(`unsub:${topic}`)
        }
    }

    /**
     * Destroy all topics
     */
    destroyTopics() {
        this.topics.forEach(t => {
            this.send(`unsub:${t.topic}`)
        })
        this.topics = []
    }
}

export default SocketClient
