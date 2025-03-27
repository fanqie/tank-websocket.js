declare namespace _default {
    export { SocketClient };
    export { useSocketClient };
}
export default _default;
import SocketClient from "./socketClient";
/**
 * Create a socket connection
 * @param url
 * @return {SocketClient}
 */
declare function useSocketClient(url?: string): SocketClient;
