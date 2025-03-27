import SocketClient from "./socketClient"

/**
 *
 * @type {SocketClient}
 */
let socketClient = null
/**
 * Create a socket connection
 * @param url
 * @return {SocketClient}
 */
const useSocketClient = (url = "") => {
    if (!url && socketClient === null) {
        throw new Error("must param at `url`")
    }
    return socketClient = socketClient ? socketClient : new SocketClient(url);
}
export default {
    SocketClient, useSocketClient
}
