const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./Routes/auth.routes');
const userRouter = require('./Routes/user.routes');
require('dotenv').config();
const app = express();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. server-to-server, curl)
    // or any origin for assistant-config public endpoint
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the interviewAI Server API' });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

module.exports = app;