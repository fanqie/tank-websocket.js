describe('tank-websocket-client test', function () {

    let conn = null
    beforeEach(() => {

        const TankWebSocket = window.TankWebSocket
        conn = new TankWebSocket.SocketClient('ws://127.0.0.1:19198');
        conn.setDebug(false)
    })
    describe('event', function () {
        it('onError', function (done) {
            conn.onError((event) => {
                console.log("event____onError____res___", conn.ws.readyState, WebSocket.CLOSED)
                assert.equal(conn.ws.readyState, WebSocket.CLOSED)
                done()
            })
            conn.close()
        });

    });
});
