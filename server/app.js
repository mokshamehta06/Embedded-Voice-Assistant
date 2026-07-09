const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./Routes/auth.routes');
const userRouter = require('./Routes/user.routes');
const assistantRoute = require('./Routes/assistant.route');
const billingRoute = require('./Routes/billing.route');
require('dotenv').config();
const app = express();

const privateCors = cors({
    origin:[
      "http://localhost:5173"
    ],
    credentials:true
  })
const publicCors = cors({
    origin:"*",
})
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the interviewAI Server API' });
});
app.use("/api/auth",privateCors, authRouter);
app.use("/api/user",privateCors, userRouter);
app.use("/api/assistant",publicCors, assistantRoute);
app.use("/api/billing",privateCors, billingRoute);
module.exports = app;