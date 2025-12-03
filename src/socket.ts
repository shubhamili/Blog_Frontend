import { io } from "socket.io-client";


const user = localStorage.getItem("userId");
const userId = user;

console.log("userid is printing :", user);

export const socket = io("http://localhost:5000", {
    query: { userId },
    transports: ["websocket"] // cleaner + faster
});

socket.on("connect", () => {
    console.log("Connected to socket:", socket.id);
});

export default socket;
