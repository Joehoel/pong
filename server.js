const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.use(express.static("public"));

io.on("connection", socket => {
  socket.emit("user", "user connected");
  socket.on("user", () => {
    console.log("user connected");
  });

  socket.on("move", data => {
    io.emit("move", data);
  });
});
