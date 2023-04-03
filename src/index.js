import SocketClient from "./socketClient"

let socketClient = null

const useSocketClient = (url = "") => {
    if (!url && socketClient === null) {
        throw new Error("must param at `url`")
    }
    return socketClient = socketClient ? socketClient : new SocketClient(url);
}
export default {
    SocketClient, useSocketClient
}
