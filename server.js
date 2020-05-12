const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running at http//localhost:${PORT}`);
});

app.use(express.static("public"));

io.on("connection", socket => {
  socket.broadcast.emit("message", "A user connected");

  socket.on("move", direction => {
    io.emit("move", direction);
  });
});
