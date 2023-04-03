describe('tank-websocket-client test', function () {

    let conn = null
    beforeEach(() => {

        const TankWebSocket = window.TankWebSocket
        conn = new TankWebSocket.SocketClient('ws://127.0.0.1:19198');
        conn.setDebug(false)
    })
    describe('reconnect ws server', function () {
        it('disconnect', function (done) {
            conn.onOpen(()=>{
                conn.send("please disconnect me!")
            })
            conn.onClose((event) => {
                console.log("____disconnect____time___readyState", new Date(), conn.ws.readyState)
                assert.equal(conn.ws.readyState, WebSocket.CLOSED)
                done()
            })
        });
        it('reconnect', function (done) {
            conn.onOpen(()=>{
                console.log("____onOpen____time___readyState", new Date(),conn.ws.readyState)
                assert.equal(conn.ws.readyState, WebSocket.OPEN)
                done()
            })

        });
    });

    afterEach(()=>{
        conn.disconnect()
    })
});
