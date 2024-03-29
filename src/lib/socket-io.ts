import { io } from "socket.io-client";

import { SOCKET_URL } from "@/config";

const URL =
  process.env.NODE_ENV === "production" ? SOCKET_URL : "http://localhost:8080";

export const socket = io(URL, {
  autoConnect: false,
  reconnectionAttempts: 5,
  reconnectionDelay: 5000,
});

socket.on("connect_error", (error) => {
  console.log(`Connection Error: ${error.message}`);
});
