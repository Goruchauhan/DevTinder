const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const app = require("./app"); // separate app.js

const Message = require("./models/message"); // ✅ message model

// Create HTTP server
const httpServer = http.createServer(app);

// Create Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // your frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  // Join a room (room = unique between two connected users)
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });   

  socket.on("whichRooms", () => {
  console.log("🔍 Rooms of", socket.id, Array.from(socket.rooms));
});

socket.on("leaveAllRooms", () => {
  const rooms = Array.from(socket.rooms);
  rooms.forEach((room) => {
    if (room !== socket.id) {
      socket.leave(room);
    }
  });
});



  // Receive and broadcast message
  socket.on("message", async ({ roomId, senderId, receiverId, message }) => {
  try {
    const savedMessage = await Message.create({
      message,    // ✅ match schema
      from: senderId, // ✅ match schema
      to: receiverId, // ✅ match schema
    });

    // Emit to everyone in the room
    io.to(roomId).emit("message", {
      _id: savedMessage._id,
      senderId,
      receiverId,
      message: savedMessage.message,
      timestamp: savedMessage.timestamp,
    });
  } catch (err) {
    console.error("Error saving message:", err.message);
  }
});


  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Connect to DB and start server
connectDB()
  .then(() => {
    console.log("✅ Connected to MongoDB");
    httpServer.listen(3000, () => {
      console.log("🚀 Server listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err.message);
  });
