export default SocketClient;
declare class SocketClient {
    constructor(url: any);
    ws: any;
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
    checkConn(): void;
    status: boolean;
    /**
     * data a text string, ArrayBuffer or Blob
     * @param data {string|any}
     */
    send(data: string | any): void;
    setDebug(debug: any): void;
    /**
     * Disable disconnecting retry links
     * @param disable
     */
    disableReConnect(disable?: boolean): void;
    /**
     * set reConnect setInterval (default:1000 ms)
     * @param  {number} interval ms
     */
    setReConnectInterval(interval: number): void;
    /**
     * Actively disconnect
     */
    close(): void;
    /**
     * Actively disconnect
     */
    disconnect(): void;
    /**
     * Listen to the link success event, with superimposed features
     * @param func {Function}
     */
    onOpen(func: Function): void;
    _emitOpen(event: any): void;
    _emitMessage(event: any): void;
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
