const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();

// Configure CORS - VERY IMPORTANT
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL in PRODUCTION!
    methods: ['GET', 'POST'],
    credentials: true // Only if you need to send cookies/auth headers
};

app.use(cors(corsOptions)); // Apply CORS middleware

const server = http.createServer(app);
const io = new Server(server, {
    cors: corsOptions // Use the same CORS options for Socket.IO
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('chartUpdate', (chartData) => {
        socket.broadcast.emit('chartUpdated', chartData);
    });

    socket.on('disconnect', (reason) => { // Include reason for disconnect
        console.log('User disconnected:', socket.id, "Reason:", reason);
    });
});

const PORT = process.env.PORT || 5000;

server.on('error', (error) => { // Handle server errors
    console.error('Server error:', error);
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});