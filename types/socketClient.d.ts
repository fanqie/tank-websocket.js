export default SocketClient;
declare class SocketClient {
    /**
     * Create a WebSocket instance
     * @param url {string} WebSocket url
     */
    constructor(url: string);
    /**
     * WebSocket instance
     * @type {WebSocket|null}
     */
    ws: WebSocket | null;
    events: {
        open: Set<any>;
        message: Set<any>;
        error: Set<any>;
        close: Set<any>;
    };
    debug: boolean;
    lastReConnTime: number;
    interval: number;
    url: string;
    useReConn: boolean;
    topics: any[];
    _sendScribeToServer(): void;
    /**
     * Handle the message received by the WebSocket instance
     * @param event {MessageEvent}
     * @private
     */
    private _subscribeOnMessageReceive;
    /**
     * Handle the message
     * @param res {{topic: string, data: string}}
     * @private
     */
    private _subscribeOnMessageHandle;
    /**
     * Check the connection status of the WebSocket instance
     * @private
     */
    private checkConn;
    /**
     * Define event listeners
     * @private
     */
    private _defineEvents;
    /**
     * Get the WebSocket instance
     * @return {WebSocket|null}
     */
    getOriginInstance(): WebSocket | null;
    /**
     *  Set whether to print the log
     * @param debug {boolean}
     */
    setDebug(debug: boolean): void;
    /**
     * Disable disconnecting retry links
     * @param disable {boolean}
     */
    disableReConnect(disable?: boolean): void;
    /**
     * set reConnect setInterval (default:1000 ms)
     * @param   interval {number} ms
     */
    setReConnectInterval(interval: number): void;
    /**
     * data a text string, ArrayBuffer or Blob
     * @param data {string | ArrayBufferLike | Blob | ArrayBufferView}
     */
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
    /**
     * Close the link same disconnect
     */
    close(): void;
    /**
     * Disconnect the link
     */
    disconnect(): void;
    /**
     * Check if the link is closed
     * @return {boolean}
     */
    isClose(): boolean;
    /**
     * Check if the link is connecting
     * @return {boolean}
     */
    isConnecting(): boolean;
    /**
     * Check if the link is open
     * @return {boolean}
     */
    isOpen(): boolean;
    /**
     * Check if the link is closing
     * @return {boolean}
     */
    isClosing(): boolean;
    /**
     * Listen to the link success event, with superimposed features
     * @param func {(evt: Event)=>void}
     */
    onOpen(func: (evt: Event) => void): void;
    /**
     * Listen to the link success event, with superimposed features
     * @param event {string}
     * @private
     */
    private _emitOpen;
    /**
     *
     * @param event {CloseEvent}
     * @private
     */
    private _emitMessage;
    /**
     * Listen to message acquisition events, with superimposed features
     * @param func {(evt: MessageEvent)=>void}
     */
    onMessage(func: (evt: MessageEvent) => void): void;
    /**
     * Monitor abnormal events, with superimposed features
     * @param func {Function}
     */
    onError(func: Function): void;
    /**
     *
     * @param event {CloseEvent}
     * @private
     */
    private _emitError;
    /**
     * Listen for link closing events, with superimposed features
     * @param func {(evt: CloseEvent)=>void}
     */
    onClose(func: (evt: CloseEvent) => void): void;
    /**
     *
     * @param event {CloseEvent}
     * @private
     */
    private _emitClose;
    /**
     * Clear all listener link close events
     */
    offCloseEvent(): void;
    /**
     * Clear all exception event listeners
     */
    offErrorEvent(): void;
    /**
     * Clear all listener messages to get events
     */
    offMessageEvent(): void;
    /**
     * Clear all listener link success events
     */
    offOpenEvent(): void;
    /**
     * Subscribe to a topic
     * @param topic {string}
     * @param callback {(data: string)=>void}
     */
    subTopic(topic: string, callback: (data: string) => void): void;
    /**
     * Unsubscribe to a topic
     * @param topic {string}
     */
    unsubTopic(topic: string): void;
    /**
     * Destroy all topics
     */
    destroyTopics(): void;
}
