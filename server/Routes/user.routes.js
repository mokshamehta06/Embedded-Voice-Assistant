const express = require("express");
const isAuth = require("../Middleware/isAuth");
const { getCurrent } = require("../Controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/current-user", isAuth, getCurrent);

module.exports = userRouter;