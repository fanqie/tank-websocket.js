const { expect } = chai;


describe('SocketClient Subscription Tests', () => {
    let client;

    beforeEach((done) => {
        const {SocketClient} = window.TankWebSocket
        client = new SocketClient('ws://localhost:19198');
        console.log("xxxxxxxxx",client)
        client.onOpen(() => {
            done();
        });
    });

    afterEach(() => {
        if (client) {
            client.close();
        }
    });

    it('should subscribe to a topic and receive messages', (done) => {
        const topic = 'test-topic';
        const testMessage = 'Hello World';

        client.subTopic(topic, (data) => {
            expect(data).to.equal(testMessage);
             done();
        });

        // 增加等待时间，确保订阅完成
        setTimeout(() => {
            client.send(testMessage);
        }, 100); // 从 100ms 增加到 500ms
    });

    it('should unsubscribe from a topic and not receive messages', (done) => {
        const topic = 'test-topic';
        const testMessage = 'Hello World';
        let messageReceived = false;

        client.subTopic(topic, () => {
            messageReceived = true;
        });

        // 等待订阅完成
        setTimeout(() => {
            client.unsubTopic(topic);
            
            // 等待取消订阅完成
            setTimeout(() => {
                client.send(testMessage);
                
                // 等待消息处理完成
                setTimeout(() => {
                    expect(messageReceived).to.be.false;
                    done();
                }, 100);
            }, 100);
        }, 100);
    });

    it('should handle multiple topics', (done) => {
        const topic1 = 'topic1';
        const topic2 = 'topic2';
        const testMessage = 'Hello World';
        let receivedCount = 0;

        client.subTopic(topic1, () => {
            receivedCount++;
            if (receivedCount === 2) done();
        });

        client.subTopic(topic2, () => {
            receivedCount++;
            if (receivedCount === 2) done();
        });

        // 等待订阅完成
        setTimeout(() => {
            client.send(testMessage);
        }, 100);
    });

    it('should destroy all topics', (done) => {
        const topic1 = 'topic1';
        const topic2 = 'topic2';
        const testMessage = 'Hello World';
        let messageReceived = false;

        client.subTopic(topic1, () => {
            messageReceived = true;
        });

        client.subTopic(topic2, () => {
            messageReceived = true;
        });

        // 等待订阅完成
        setTimeout(() => {
            client.destroyTopics();
            
            // 等待销毁完成
            setTimeout(() => {
                client.send(testMessage);
                
                // 等待消息处理完成
                setTimeout(() => {
                    expect(messageReceived).to.be.false;
                    done();
                }, 100);
            }, 100);
        }, 100);
    });
}); 