"use strict";
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express(); // Create an Express application
app.use(cors());
const server = http.createServer(app); // Create an HTTP server using Express
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("user-msg", (message) => {
        console.log(`user with id-${socket.id} sent msg - ${message}`);
        io.emit("serverMessage", message);
    });
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Socket.io server is running on port ${PORT}`);
});
