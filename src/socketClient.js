class SocketClient {
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

    checkConn() {
        setTimeout(() => {
            if (this.useReConn && this.ws && this.ws.readyState > 1 && (new Date().getTime() - this.lastReConnTime) > this.interval) {
                console.log("reconnect socket=》》》", this.url)
                this.ws = new WebSocket(this.url)
            }

            if (this.ws) {
                this.checkConn()
            }
        }, 1000)
    }

    constructor(url) {
        this.useReConn = true
        this.setDebug(true)
        this.setReConnectInterval(1000)
        this.url = url
        this.ws = new WebSocket(url)
        this.checkConn()
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


        this.onOpen((event) => {
            if (this.debug) {
                console.log("socket open", event)
            }
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
        })
        this.onError((event) => {
            if (this.debug) {
                console.log("socket exception", event)
            }
        })

    }



    setDebug(debug) {
        this.debug = debug
    }

    /**
     * Disable disconnecting retry links
     * @param disable
     */
    disableReConnect(disable = false) {
        this.useReConn = !disable
    }

    /**
     * set reConnect setInterval (default:1000 ms)
     * @param  {number} interval ms
     */
    setReConnectInterval(interval) {
        this.interval = interval
    }
    /**
     * data a text string, ArrayBuffer or Blob
     * @param data {string|any}
     */
    send(data) {
        try {
            this.ws.send(data)
        } catch (e) {
            console.log(e)
        }

    }
    /**
     * Actively disconnect
     */
    close() {
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
     * Actively disconnect
     */
    disconnect() {
        this.close()
    }

    /**
     * Listen to the link success event, with superimposed features
     * @param func {Function}
     */
    onOpen(func) {
        if (typeof func === "function") {
            this.events.open.add(func)
        }
    }

    _emitOpen(event) {
        this.events.open.forEach((func) => {
            func(event)
        })
    }

    _emitMessage(event) {
        this.events.message.forEach((func) => {
            func(event)
        })
    }

    /**
     * Listen to message acquisition events, with superimposed features
     * @param func {Function}
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

    _emitError(event) {
        this.events.error.forEach((func) => {
            func(event)
        })
    }

    /**
     * Listen for link closing events, with superimposed features
     * @param func {Function}
     */
    onClose(func) {
        if (typeof func === "function") {
            this.events.close.add(func)
        }
    }

    /**
     *
     * @param event
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
}

export default SocketClient
