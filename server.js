const express = require("express");
const mangoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const options = {
  cors: true,
  origins: ["http://localhost:3000/"],
};
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);

app.use(cors());

const io = socketIo(server, options);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/servers", require("./TheServer/router"));
app.use("/api/servers/messages", require("./TheServer/messages"));
mangoose.connect(
  "mongodb+srv://admin:admin@cluster0.b14gu.mongodb.net/Discord?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB is connected");
  }
);

const users = {};

const socketToRoom = {};

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("joinserver", (serverid) => {
    socket.join(serverid);
  });
  socket.on("mess", (mess) => {
    //   socket.broadcast.to(mess.sid).emit("mess", mess);
    io.to(mess.sid).emit("mess", mess);
  });

  socket.on("join room", (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("dis", (serverid) => {
    socket.leave(serverid);
  });
  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
  });
});

server.listen(5000, () => {
  console.log("server is working");
});
