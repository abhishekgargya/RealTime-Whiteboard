const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const { addUser, removeUser, getUsersInRoom } = require("./utils/users");
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("This is realtime whiteboard sharing server");
});

let roomIdGlobal, imgURLGlobal;

io.on("connection", (socket) => {
  socket.on("userJoined", (data) => {
    const { name, userId, roomId, host, presenter } = data;
    roomIdGlobal = roomId;
    socket.join(roomId);
    const users = addUser({ socketId: socket.id, ...data });


    // Send to the newly joined user
    socket.emit("allUsers", users);
    socket.on("get-whiteboard", () => {
      socket.emit("whiteboardDataResponse", {
        imgURL: imgURLGlobal,
      });
    });


    // Notify all others in the room
    socket.broadcast.to(roomId).emit("userIsJoined", { success: true, users });
    socket.broadcast.to(roomId).emit("allUsers", users);

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
      if (user) {
        const updatedUsers = getUsersInRoom(user.roomId);
        io.to(user.roomId).emit("allUsers", updatedUsers);
      }
    });

  });


  socket.on("whiteboardData", (data)=>{
    imgURLGlobal = data;
    socket.broadcast.to(roomIdGlobal).emit("whiteboardDataResponse", {
      imgURL: data,
    })
  }); 
});



const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));
