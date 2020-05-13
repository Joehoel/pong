const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running at http//localhost:${PORT}`);
});

app.use(express.static("public"));

const players = [];

io.on("connection", socket => {
  const player = {
    id: socket.id,
    side: players.length,
  };
  players.push(player);

  console.log(players);

  socket.emit("side", player.side);

  socket.emit("message", `${player.id} connected`);

  socket.on("move-left", direction => {
    io.emit("move-left", direction);
  });

  socket.on("move-right", direction => {
    io.emit("move-right", direction);
  });

  socket.on("disconnect", () => {
    console.log(players);
    const idx = players.find(() => socket.id == player.id);
    players.splice(idx, 1);
  });
});
