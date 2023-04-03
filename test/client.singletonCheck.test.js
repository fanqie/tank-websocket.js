describe('tank-websocket-client test', function () {

    let conn = null
    beforeEach(() => {
        const TankWebSocket = window.TankWebSocket
        conn = TankWebSocket.useSocketClient('ws://127.0.0.1:19198');
        conn.setDebug(false)
        conn.offOpenEvent()
        conn.onOpen((event) => {
            //it adds event
        })
    })
    describe('singleton test', function () {

        it('singleton', function (done) {
            console.log("_____useSocketClient_______", TankWebSocket.useSocketClient().events.open.size)
            assert.equal(TankWebSocket.useSocketClient().events.open.size, 1)
            TankWebSocket.useSocketClient()
            done()
        });

    });
});
