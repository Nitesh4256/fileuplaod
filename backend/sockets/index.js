const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    io.emit("userConnected", { socketId: socket.id, count: io.engine.clientsCount });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = setupSocket;
