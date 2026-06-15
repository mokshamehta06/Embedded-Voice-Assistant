const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./Routes/auth.routes');
const userRouter = require('./Routes/user.routes');
require('dotenv').config();
const app = express();

// Middleware
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
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
