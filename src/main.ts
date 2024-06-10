import * as net from "net";

import { PORT } from "./constants";
import { validateSynLoggerMsg } from "./validation/validation";

const server = net.createServer((socket) => {
  console.log("Client connected");

  let buffer = "";

  socket.on("data", (buf) => {
    buffer += validateSynLoggerMsg(buf)
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});