declare namespace _default {
    export { SocketClient };
    export { useSocketClient };
}
export default _default;
import SocketClient from "./socketClient";
declare function useSocketClient(url?: string): any;
