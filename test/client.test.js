describe('tank-websocket-client test', function () {
    let conn = null
    beforeEach(() => {
        const TankWebSocket = window.TankWebSocket
        conn = new TankWebSocket.SocketClient('ws://127.0.0.1:19198');
        conn.setDebug(false)
    })
    describe('event', function () {

        it('send', function (done) {
            conn.onOpen((event) => {
                console.log("____onOpen____readyState___", conn.ws.readyState,WebSocket.OPEN)
                assert.equal(conn.ws.readyState,WebSocket.OPEN)
                done()
            })
        });
        it('onMessage', function (done) {
            conn.onOpen((event) => {
                const data = "hi gays ,tank man it's me!"
                conn.onMessage((event) => {
                    console.log("____onMessage____data___", event.data)
                    assert.equal(event.data,data)

                    done()
                })
                conn.send(data);
            })


        });


    });
});
