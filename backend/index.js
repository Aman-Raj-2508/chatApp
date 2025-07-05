const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoute');
const cookieParser = require('cookie-parser');
const path = require('path');

const { app, server } = require('./sokcetIO/server'); // Import the app from socketIO server

require('dotenv').config();

const port = process.env.PORT || 3001;
// middleware to parse JSON bodies
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Middleware to parse cookies
app.use(cookieParser());

// Mount User Routes
app.use('/api/v1', userRoutes);

// Mount Message Routes
app.use('/api/v1', messageRoutes);

// Deployment Code
if (process.env.NODE_ENV === "production") {
    const dirPath = path.resolve();
    app.use(express.static("./frontend/dist"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirPath, "./frontend/dist", "index.html"));
    });
}


// Database connection
const dbConnect = require('./config/database');
dbConnect();

app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});