import { io } from "socket.io-client";



const user = localStorage.getItem("userId") ? { id: localStorage.getItem("userId") } : null;
const userId = user ? user.id : null;
console.log("userid", user);

export const socket = io("http://localhost:5000", {
    query: { userId },
    transports: ["websocket"] // cleaner + faster
});

socket.on("connect", () => {
    console.log("Connected to socket:", socket.id);
});

export default socket;
