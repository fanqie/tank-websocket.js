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
    /**
     * Check the connection status of the WebSocket instance
     * @private
     */
    private checkConn;
    /**
     * Get the Origin WebSocket instance
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
     * @param data {string|any}
     */
    send(data: string | any): void;
    /**
     * Actively disconnect
     */
    close(): void;
    /**
     * Actively disconnect
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
     * @param func {Function}
     */
    onOpen(func: Function): void;
    /**
     * Listen to the link success event, with superimposed features
     * @param event {string}
     * @private
     */
    private _emitOpen;
    /**
     *
     * @param event
     * @private
     */
    private _emitMessage;
    /**
     * Listen to message acquisition events, with superimposed features
     * @param func {Function}
     */
    onMessage(func: Function): void;
    /**
     * Monitor abnormal events, with superimposed features
     * @param func {Function}
     */
    onError(func: Function): void;
    _emitError(event: any): void;
    /**
     * Listen for link closing events, with superimposed features
     * @param func {Function}
     */
    onClose(func: Function): void;
    /**
     *
     * @param event
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
}
