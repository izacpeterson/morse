/** @format */

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let str = "";
app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    str += msg;
    console.clear();
    console.log(str);
  });
  socket.on("clear", (msg) => {
    io.emit("clear", msg);
  });
});

server.listen(3000, () => {
  console.log("server listening");
});
