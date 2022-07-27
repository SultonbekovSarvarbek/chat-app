import { io } from "socket.io-client";
import { getToken } from "@/utils/auth";

const socket = io("ws://0.0.0.0:8000/ws", {
  query: {
    token: getToken(),
  },
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
