import * as net from "net";
import * as dotenv from "dotenv";

import { PORT } from "./constants";
import { validateSynLoggerMsg } from "./validation/validation";
import { handleSynLoggerMsg } from "./services/syn-logger-msg-handler";

dotenv.config();

const server = net.createServer((socket) => {
  console.log("Client connected");

  //concatinate the incoming messages
  let buffer = "";

  socket.on("data", (buf) => {
    const validatedSynLoggerMsg = validateSynLoggerMsg(buf);
    buffer += validatedSynLoggerMsg;

    console.log(`Recieved: ${validatedSynLoggerMsg}`)
  });

  socket.on("end", () => {
    console.log("Client disconnected");
    try {
      handleSynLoggerMsg(buffer);
    } catch (error) {
      console.log("An error has occured: ", error);
    }
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});


server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});
